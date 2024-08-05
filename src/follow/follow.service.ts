import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Injectable()
export class FollowService {
  constructor(private readonly prisma: PrismaService) {}
  async followUser(followerId: number, followDto: CreateFollowDto) {}
}
