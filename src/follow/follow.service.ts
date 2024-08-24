import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async toggleFollow(followerId: number, followingId: number) {
    try {
      // 본인 팔로우를 시도하는 경우 에러 처리
      if (followerId === followingId) {
        throw new BadRequestException('자기 자신을 팔로우할 수 없습니다.');
      }

      const existing = await this.prisma.follow.findFirst({
        where: {
          followerId: Number(followerId),
          followingId: Number(followingId),
        },
      });

      if (existing) {
        // 이미 팔로우 되어 있다면 언팔로우 처리
        const followInfo = await this.prisma.follow.delete({
          where: {
            id: existing.id,
          },
        });
        return followInfo;
      } else {
        // 팔로우되지 않았다면 팔로우 처리
        const followInfo = await this.prisma.follow.create({
          data: {
            followerId: Number(followerId),
            followingId: Number(followingId),
          },
        });
        return followInfo;
      }
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      } else {
        // 예기치 않은 에러 처리
        throw new InternalServerErrorException('팔로우/언팔로우 처리 중 오류가 발생했습니다.');
      }
    }
  }
}
