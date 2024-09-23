import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LikesService {
  constructor(private prisma: PrismaService) {}

  async createLike(createLikeDto: CreateLikeDto, userId: string) {
    const { postId } = createLikeDto;

    const post = await this.prisma.post.findUnique({
      where: { id: +postId },
    });

    if (!post) {
      throw new NotFoundException(`Post with ID ${postId} not found`);
    }

    const alreadyLike = await this.prisma.like.findFirst({
      where: {
        userId: +userId,
        postId: +postId,
      },
    });

    if (alreadyLike) {
      throw new ConflictException('You have already liked this post');
    }

    try {
      const newLike = await this.prisma.like.create({
        data: {
          userId: +userId,
          postId: +postId,
        },
      });
      return newLike;
    } catch (error) {
      throw new Error('좋아요에 실패하였습니다.');
    }
  }

  async deleteLike(id: number, userId: string) {
    const like = await this.prisma.like.findUnique({
      where: { id },
    });

    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }

    if (like.userId !== +userId) {
      throw new UnauthorizedException(`You can only delete your own likes`);
    }

    try {
      await this.prisma.like.delete({
        where: { id },
      });
      return `좋아요(${id})가 성공적으로 취소되었습니다.`;
    } catch (error) {
      throw new Error('좋아요 취소에 실패하였습니다.');
    }
  }
}
