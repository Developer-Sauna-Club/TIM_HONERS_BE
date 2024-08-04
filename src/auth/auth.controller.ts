import { Controller, Get, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto/signup.dto';
import { SignInDTO } from './dto/signin.dto';
import { UsersService } from 'src/users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() body: SignUpDTO) {
    const token = await this.authService.signUp(body);
    const user = await this.usersService.getUserByEmail(body.email);

    return {
      user,
      token: token.access_token,
    };
  }

  @Post('signin')
  async signIn(@Body() body: SignInDTO) {
    const token = await this.authService.signIn(body);
    const user = await this.usersService.getUserByEmail(body.email);

    return {
      user,
      token: token.access_token,
    };
  }

  @Get('check')
  check() {
    return 'Check';
  }
}
