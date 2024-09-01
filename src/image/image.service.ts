import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({
  secure: true,
});

@Injectable()
export class ImageService {
  create(file: Express.Multer.File): Promise<UploadApiResponse> {
    cloudinary.config({
      cloud_name: process.env.ClOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream((error, result) => {
        if (error) return reject(error);
        resolve(result);
      });

      // Cloudinary expects a buffer
      upload.end(file.buffer);
    });
  }

  async deleteImageFromCloudinary(imagePublicId: string) {
    cloudinary.config({
      cloud_name: process.env.ClOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    });

    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(imagePublicId, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
    });
  }
}
