import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from '../prisma.service';
import { ImageService } from '../image/image.service';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private imageService: ImageService,
  ) {}

  async findAllByChannelId(channelId: number) {
    const postList = await this.prisma.post.findMany({
      where: {
        channelId,
      },
    });
    return postList;
  }

  async findAllByAuthorId(authorId: number) {
    const postList = await this.prisma.post.findMany({
      where: {
        userId: authorId,
      },
    });
    return postList;
  }

  async findOneByPostId(id: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
    return post;
  }

  async create(createPostDto: CreatePostDto, image: Express.Multer.File, userId: number) {
    let imageResult;

    if (image) {
      imageResult = await this.imageService.create(image);
    }

    const post = await this.prisma.post.create({
      data: {
        image: imageResult ? imageResult.url : undefined,
        imagePublicId: imageResult ? imageResult.public_id : undefined,
        title: createPostDto.title,
        userId,
        channelId: createPostDto.channelId,
      },
    });

    return post;
  }

  async update(updatePostDto: UpdatePostDto, image: Express.Multer.File, userId: number) {
    const post = await this.prisma.post.findUnique({
      where: {
        userId,
        id: updatePostDto.postId,
      },
    });

    if (!post) {
      throw new Error('사용자가 작성한 post가 아닙니다');
    }

    let imageResult: UploadApiResponse | undefined;

    if (updatePostDto.imageToDeletePublicId) {
      await this.imageService.deleteImageFromCloudinary(updatePostDto.imageToDeletePublicId);
    }

    if (image) {
      imageResult = await this.imageService.create(image);
    }

    await this.prisma.post.update({
      where: {
        id: updatePostDto.postId,
      },
      data: {
        image: imageResult ? imageResult.url : undefined,
        imagePublicId: imageResult ? imageResult.public_id : undefined,
        title: updatePostDto.title,
      },
    });

    return `This action updates a post`;
  }

  async remove(id: number, userId: number) {
    const post = await this.prisma.post.findFirst({
      where: {
        userId,
      },
    });

    if (!post) {
      throw new Error('사용자가 작성한 post가 아닙니다');
    }

    const selectedPost = await this.prisma.post.findUnique({
      where: {
        id,
      },
    });

    if (selectedPost.imagePublicId) {
      await this.imageService.deleteImageFromCloudinary(selectedPost.imagePublicId);
    }

    await this.prisma.post.delete({
      where: {
        userId,
        id,
      },
    });

    return `This action removes a #${id} post`;
  }
}
