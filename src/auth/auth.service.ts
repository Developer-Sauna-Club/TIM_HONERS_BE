import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { SignUpDTO } from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(signupDTO: SignUpDTO) {
    const { email, nickname, password } = signupDTO;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName: nickname,
        },
      });
    } catch (error) {
      if (error.code === 'P2002' || error.message.includes('unique constraint')) {
        throw new HttpException(
          {
            status: HttpStatus.CONFLICT,
            error: '이미 존재하는 이메일입니다.',
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new HttpException('회원가입에 실패했습니다.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
