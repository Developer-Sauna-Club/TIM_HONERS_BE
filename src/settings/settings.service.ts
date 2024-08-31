import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SettingsService {
  constructor(private prisma: PrismaService) {}

  async updateUser(userId: number, updateUserDto: UpdateUserDto) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          fullName: updateUserDto.fullName,
          username: updateUserDto.username,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException(
        'Failed to update user information',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updatePassword(userId: number, updatePassword: UpdatePasswordDto) {
    try {
      const { password: newPassword } = updatePassword;
      const salt = await bcrypt.genSalt();
      const hashedNewPassword = await bcrypt.hash(newPassword, salt);

      const updatedUser = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          password: hashedNewPassword,
        },
        select: {
          id: true,
          email: true,
          fullName: true,
        },
      });

      return updatedUser;
    } catch (error) {
      throw new HttpException('Failed to update password', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
