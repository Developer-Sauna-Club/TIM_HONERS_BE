import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      select: {
        id: true,
        email: true,
        password: false,
        fullName: true,
        username: true,
        profileImage: true,
        coverImage: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        email,
      },
    });
  }
}
