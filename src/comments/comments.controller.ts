import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('comments')
@Controller('comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({
    summary: '특정 포스트에 댓글 달기',
    description: '특정 포스트에 댓글을 작성합니다.',
  })
  @Post('create')
  create(@Body() createCommentDto: CreateCommentDto, @Req() req) {
    return this.commentsService.createComment(createCommentDto, req.user.id);
  }

  @ApiOperation({
    summary: '특정 포스트에 작성한 내 댓글 지우기',
    description: '특정 포스트에 작성한 내 댓글을 삭제합니다.',
  })
  @Delete('delete')
  delete(@Body('id') id: string, @Req() req) {
    return this.commentsService.deleteComment(id, req.user.id);
  }
}
