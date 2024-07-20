import { Injectable } from '@nestjs/common';
import { Post, User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SearchService {
  constructor(private prisma: PrismaService) {}

  async findUsers(query: string): Promise<User[]> {
    return await this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
    });
  }

  async findAll(query: string): Promise<(User | Post)[]> {
    const users = await this.prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
      },
    });

    const posts = await this.prisma.post.findMany({
      where: {
        title: {
          contains: query,
        },
      },
    });
    return [...users, ...posts];
  }
}
