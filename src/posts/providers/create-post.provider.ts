import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,

    private readonly tagsService: TagsService,

    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let tags = [];
    let author = undefined;

    try {
      author = await this.usersService.findOneById(user.sub);
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPostDto.tags.length !== tags.length) {
      throw new BadRequestException('please check tag ids');
    }

    const post = this.postsRepository.create({
      ...createPostDto,
      //is only gonna save the authorId
      author,
      //will update the posts_tag_tag DB with the postId and the tagId
      tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException('error saving post', error);
    }
  }
}
