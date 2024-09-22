import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
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
    return this.postsService.findAllByChannelId(channelId);
  }

  @ApiOperation({
    summary: '특정 사용자의 포스트 목록 불러오기',
    description: '특정 사용자의 포스트 목록 불러오기',
  })
  @Get('/author/:authorId')
  findAllByUser(@Param('authorId') authorId: number) {
    return this.postsService.findAllByAuthorId(authorId);
  }

  // TODO 테스트  필요
  @ApiOperation({
    summary: '특정 채널에 포스트 작성하기',
    description: '특정 채널에 포스트를 작성합니다. (토큰 필요)',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Post('create')
  create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req,
  ) {
    return this.postsService.create(createPostDto, image, req.user.id);
  }

  @ApiOperation({
    summary: '특정 포스트 상세 보기',
    description: '특정 포스트의 정보를 불러옵니다.',
  })
  @Get('/:postId')
  findOne(@Param('postId') postId: number) {
    return this.postsService.findOneByPostId(postId);
  }

  //TODO 테스트 필요
  @ApiOperation({
    summary: '내가 작성한 포스트 수정하기',
    description: '내가 작성한 포스트를 수정합니다. (토큰 필요)',
  })
  @UseGuards(JwtAuthGuard)
  @Put('update')
  update(
    @Body() updatePostDto: UpdatePostDto,
    @UploadedFile() image: Express.Multer.File,
    @Req() req,
  ) {
    return this.postsService.update(updatePostDto, image, req.user.id);
  }

  //TODO 구현 필요
  @ApiOperation({
    summary: '내가 작성한 포스트 삭제하기',
    description: '내가 작성한 포스트를 삭제합니다. (토큰 필요)',
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  @Delete('delete')
  remove(@Body() { id }: { id: number }, @Req() req) {
    return this.postsService.remove(id, req.user.id);
  }
}
