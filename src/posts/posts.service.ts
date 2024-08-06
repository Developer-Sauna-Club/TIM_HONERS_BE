import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async findAllByChannelId(channelId: number) {
    const post = await this.prisma.post.findMany({
      where: {
        channelId,
      },
    });
    return post;
  }

  async findAllByAuthorId(authorId: number) {
    const post = await this.prisma.post.findMany({
      where: {
        userId: authorId,
      },
    });
    return post;
  }

  async findOneByPostId(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  }

  create(createPostDto: CreatePostDto) {
    return 'This action adds a new post';
  }

  update(updatePostDto: UpdatePostDto) {
    return `This action updates a post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
