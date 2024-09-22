import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async createComment(createCommentDto: CreateCommentDto, userId: string) {
    const { comment, postId } = createCommentDto;

    // 1. 게시글부터 찾자
    const post = await this.prisma.post.findUnique({ where: { id: +postId } });
    // 1.1. 못 찾으면 NotFoundException을 던지자
    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    //TODO 2. 프리즈마로 comment 모델에 새 데이터를 생성하자
    try {
      const newComment = await this.prisma.comment.create({
        data: {
          comment,
          postId: +postId,
          userId: +userId,
        },
      });
      return newComment;
    } catch (error) {
      throw new Error('댓글 생성에 실패하였습니다.');
    }
  }

  async deleteComment(id: string, userId: string) {
    // 1. 받은 코멘트 id로 코멘트를 찾자
    const comment = await this.prisma.comment.findUnique({
      where: { id: +id },
    });
    // 1.1. 코멘트를 못 찾으면 NotFoundException을 던지자
    if (!comment) {
      throw new NotFoundException(`Comment with ID ${id} not found`);
    }
    // 1.2. 본인의 코멘트가 아니면 NotFoundException을 던지자
    if (comment.userId !== +userId) {
      throw new NotFoundException(`You can only delete your own comments`);
    }
    //TODO 2. 프리즈마로 comment 모델에 데이터를 제거하자
    try {
      await this.prisma.comment.delete({
        where: { id: +id },
      });
      return `댓글(${id})이 성공적으로 삭제되었습니다.`;
    } catch (error) {
      throw new Error('댓글 삭제에 실패하였습니다.');
    }
  }
}
