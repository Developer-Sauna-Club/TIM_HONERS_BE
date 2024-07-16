import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: '특정 채널의 포스트 목록 불러오기',
    description: '특정 채널의 포스트 목록을 불러옵니다.',
  })
  @Get('/channel/:channelId')
  findAll(@Param('channelId') channelId: number) {
    return this.postsService.findAll(channelId);
  }

  @ApiOperation({
    summary: '특정 사용자의 포스트 목록 불러오기',
    description: '특정 사용자의 포스트 목록 불러오기',
  })
  @Get('/author/:authorId')
  findAllByUser(@Param('authorId') authorId: number) {
    return this.postsService.findOne(authorId);
  }

  @ApiOperation({
    summary: '특정 채널에 포스트 작성하기',
    description: '특정 채널에 포스트를 작성합니다. (토큰 필요)',
  })
  @Post('create')
  create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: '특정 사용자의 포스트 목록 불러오기',
    description: '특정 사용자의 포스트 목록 불러오기',
  })
  @Get('/:postId')
  findOne(@Param('postId') postId: number) {
    return this.postsService.findOne(postId);
  }

  @ApiOperation({
    summary: '내가 작성한 포스트 수정하기',
    description: '내가 작성한 포스트를 수정합니다. (토큰 필요)',
  })
  @Put('update')
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(updatePostDto);
  }

  @ApiOperation({
    summary: '내가 작성한 포스트 삭제하기',
    description: '내가 작성한 포스트를 삭제합니다. (토큰 필요)',
  })
  @Delete('delete')
  remove(@Body() { id }: { id: number }) {
    return this.postsService.remove(id);
  }
}
