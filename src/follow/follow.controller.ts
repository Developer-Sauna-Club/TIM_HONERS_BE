import { Body, Controller, Post, UseGuards, Req } from '@nestjs/common';
import { FollowService } from './follow.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('follow')
export class FollowController {
  constructor(private readonly followService: FollowService) {}

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async postFollow(@Body() body: CreateFollowDto, @Req() req) {
    return this.followService.toggleFollow(req.user.id, body.userId);
  }

  @Post('/delete')
  @UseGuards(JwtAuthGuard)
  async postUnFollow(@Body() body: CreateFollowDto, @Req() req) {
    return this.followService.toggleFollow(req.user.id, body.userId);
  }
}
