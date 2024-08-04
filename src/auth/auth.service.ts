import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';

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

  async signIn(signInDTO: SignInDTO) {
    const { email, password } = signInDTO;

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: '존재하지 않는 이메일입니다.',
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: '비밀번호가 일치하지 않습니다.',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }
}
