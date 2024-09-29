import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
export class CreatePostDto {
  @ApiProperty({
    example: '[속보] 최저임금 만원 돌파!',
    description: '게시글의 제목',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  channelId: number;

  //TODO 파일 업로드 구현 이후 수정
  @IsOptional()
  image?: File;
}
