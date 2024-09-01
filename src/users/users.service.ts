import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    const { password, ...result } = user;
    return result;
  }

  async getUserByUserId(userDto: UserDto) {
    const { userId } = userDto;
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    const { password, ...result } = user;

    return result;
  }
}
