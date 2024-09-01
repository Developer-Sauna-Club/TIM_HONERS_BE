import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/:userId')
  getUserInfo(@Param() userDto: UserDto) {
    return this.usersService.getUserByUserId(userDto);
  }
}
