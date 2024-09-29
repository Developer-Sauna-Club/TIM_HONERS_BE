import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@ApiTags('likes')
@Controller('likes')
@UseGuards(JwtAuthGuard)
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({
    summary: '특정 포스트 좋아요',
    description: '특정 포스트에 좋아요합니다.',
  })
  @Post('create')
  create(@Body() createLikeDto: CreateLikeDto, @Req() req) {
    return this.likesService.createLike(createLikeDto, req.user.id);
  }

  @ApiOperation({
    summary: '특정 포스트 좋아요 취소',
    description: '특정 포스트에 좋아요한 것을 취소합니다.',
  })
  @Delete('delete')
  remove(@Body('id') id: string, @Req() req) {
    return this.likesService.deleteLike(+id, req.user.id);
  }
}
