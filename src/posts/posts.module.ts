import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { ImageService } from 'src/image/image.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, PrismaService, ImageService],
})
export class PostsModule {}
