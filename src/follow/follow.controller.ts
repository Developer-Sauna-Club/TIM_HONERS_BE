import { Body, Controller, Post, Headers } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('follow/create')
  async postFollow(
    @Body('userId') body: CreateFollowDto,
    @Headers('authorization') token: string,
  ) {}
}
