import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDTO: SignUpDTO) {
    const { email, nickname, password } = signupDTO;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          fullName: nickname,
        },
      });

      const token = await this.createToken({
        email: user.email,
      });

      return token;
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

    const token = await this.createToken({
      email: user.email,
    });

    return token;
  }

  async validateToken(payload: JwtPayloadDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: payload.email,
      },
    });

    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const { password, ...result } = user;
    return result;
  }

  async createToken(user: { email: string }) {
    const payload = { email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
