import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostProvider } from './create-post.provider';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider: CreatePostProvider,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  // HOW TO DO IT WITHOUT CASCADE
  // public async create(@Body() createPostDto: CreatePostDto) {
  //   const metaOptions = createPostDto.metaOptions
  //     ? this.metaOptionsRepository.create(createPostDto.metaOptions)
  //     : null;

  //   const post = this.postsRepository.create(createPostDto);
  //   if (metaOptions) {
  //     await this.metaOptionsRepository.save(metaOptions);
  //     post.metaOptions = metaOptions;
  //   }
  //   return await this.postsRepository.save(post);
  // }

  // HOW TO DO IT WITH CASCADE
  // public async createOld(createPostDto: CreatePostDto) {
  //   const author = await this.usersService.findOneById(createPostDto.authorId);
  //   const tags = await this.tagsService.findMultipleTags(createPostDto.tags);
  //   const post = this.postsRepository.create({
  //     ...createPostDto,
  //     //is only gonna save the authorId
  //     author: author,
  //     //will update the posts_tag_tag DB with the postId and the tagId
  //     tags,
  //   });
  //   return await this.postsRepository.save(post);
  // }

  //OLD
  // public async findAll(postsQuery: GetPostsDto) {
  //   // console.log('userId', userId);
  //   // // need UsersService
  //   // // find user, if it exists, return their posts
  //   // const user = this.usersService.findOneById(userId);
  //   const posts = await this.postsRepository.find({
  //     // will fetch this data now => can use instead of eager
  //     relations: {
  //       metaOptions: true,
  //       //key is what is defined in entitity - can either do this or eager loading
  //       author: true,
  //       tags: true,
  //     },
  //     skip: (postsQuery.page - 1) * postsQuery.limit,
  //     take: postsQuery.limit,
  //   });
  //   return posts;
  // }

  public async findAll(postsQuery: GetPostsDto): Promise<Paginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      {
        limit: postsQuery.limit,
        page: postsQuery.page,
      },
      this.postsRepository,
    );
  }

  public async update(patchPostDto: PatchPostDto) {
    // find the tags
    let tags = undefined;
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(`error finding tags`);
    }
    if (!tags || tags.length !== patchPostDto.tags.length) {
      throw new BadRequestException(
        `please check your tag IDs and ensure they are correct`,
      );
    }
    // find the existing post
    let existingPost = undefined;
    try {
      existingPost = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(`error getting post`);
    }
    if (!existingPost) {
      throw new BadRequestException(`couldnt find the post`);
    }
    // update properties of post
    existingPost.title = patchPostDto.title ?? existingPost.title; // spread operators of both objects wouldnt work here, typeorm considers it to create a new instance of a post and a duplicate value
    existingPost.content = patchPostDto.content ?? existingPost.content;
    existingPost.status = patchPostDto.status ?? existingPost.status;
    existingPost.postType = patchPostDto.postType ?? existingPost.postType;
    existingPost.slug = patchPostDto.slug ?? existingPost.slug;
    existingPost.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? existingPost.featuredImageUrl;
    existingPost.publishedOn =
      patchPostDto.publishedOn ?? existingPost.publishedOn;
    // asign the new tags
    existingPost.tags = tags;

    // save and return => save works to save new or update existing

    try {
      return this.postsRepository.save(existingPost);
    } catch (error) {
      console.error(error);
      throw new RequestTimeoutException(`error saving post`);
    }
  }

  public async delete(id: number) {
    // FIRST
    // const post = await this.postsRepository.findOneBy({ id });
    // await this.postsRepository.delete(id);
    // // should aim to avoid using multiple repositories like this
    // await this.metaOptionsRepository.delete(post.metaOptions.id);

    // SECOND
    //this is only possible bc we have set up the bi-directional relationship
    // const inversePost = await this.metaOptionsRepository.find({
    //   where: {
    //     id: post.id,
    //   },
    //   relations: { post: true },
    // });

    // FINAL AND BEST
    await this.postsRepository.delete(id);
    // since cascade is set to true inside metaOption.entity, it will be deleted as well when we do this

    return { deleted: true, id };
  }
}
