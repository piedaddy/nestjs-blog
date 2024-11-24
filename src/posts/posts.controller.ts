import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/:userId?')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postsQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postsQuery);
  }

  @ApiOperation({
    summary: 'This API endpoint creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get 201 response if your post is created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'You get 400 response if there was some issue',
  })
  @Post()
  // try to avoid using this @Req unless absolutely necessary, makes testing difficult - better to make custom decorator
  // public createPost(@Req() request) {
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
  }

  @ApiOperation({
    summary: 'This API endpoint edits an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get 201 response if your post is edited successfully',
  })
  @Patch()
  public update(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.update(patchPostDto);
  }

  @Delete()
  // ParseIntPipe will convert it to a number
  public delete(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
