import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  postId: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  channelId: number;

  @IsOptional()
  @IsString()
  imageToDeletePublicId?: string;
}
