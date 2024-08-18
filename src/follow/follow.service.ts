import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}

  async followUser(followerId: number, followingId: number) {
    const existing = await this.prisma.follow.findFirst({
      where: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      },
    });

    if (existing) {
      throw new BadRequestException('이미 존재하는 팔로우 요청입니다.');
    }

    const createFollow = this.prisma.follow.create({
      data: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      },
    });

    const findFollowInfo = this.prisma.user.findUnique({
      where: {
        id: Number(followerId),
      },
      include: {
        Follow_Follow_followerIdToUser: {
          include: {
            User_Follow_followingIdToUser: true,
          },
        },
        Follow_Follow_followingIdToUser: {
          include: {
            User_Follow_followerIdToUser: true,
          },
        },
      },
    });

    const [_, followInfo] = await this.prisma.$transaction([createFollow, findFollowInfo]);

    return followInfo;
  }

  async unFollowUser(followerId: number, followingId: number) {
    const existing = await this.prisma.follow.findFirst({
      where: {
        followerId: Number(followerId),
        followingId: Number(followingId),
      },
    });

    if (!existing) {
      throw new BadRequestException('이미 삭제된 팔로우 요청입니다.');
    }

    const deleteFollow = this.prisma.follow.delete({
      where: {
        id: existing.id,
      },
    });

    const findFollowInfo = this.prisma.user.findUnique({
      where: {
        id: Number(followerId),
      },
      include: {
        Follow_Follow_followerIdToUser: {
          include: {
            User_Follow_followingIdToUser: true,
          },
        },
        Follow_Follow_followingIdToUser: {
          include: {
            User_Follow_followerIdToUser: true,
          },
        },
      },
    });

    const [_, followInfo] = await this.prisma.$transaction([deleteFollow, findFollowInfo]);

    return followInfo;
  }
}
