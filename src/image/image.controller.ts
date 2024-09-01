import { Controller, Post, UploadedFile, UseInterceptors, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.imageService.create(file);
  }

  @Post('image-delete')
  async deleteImage(@Body() body: { imagePublicId: string }) {
    return this.imageService.deleteImageFromCloudinary(body.imagePublicId);
  }
}
