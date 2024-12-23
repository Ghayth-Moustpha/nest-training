import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ImageUploadService {
  getMulterConfig() {
    return {
      storage: diskStorage({
        destination: './uploads', // where to save the image
        filename: (req, file, callback) => {
          const fileExtension = extname(file.originalname);
          const filename = `${uuidv4()}${fileExtension}`;
          callback(null, filename);
        },
      }),
      fileFilter: (req, file, callback) => {
        const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
        const fileExtension = extname(file.originalname).toLowerCase();

        // Check if file extension is allowed
        if (!allowedExtensions.includes(fileExtension)) {
          return callback(new Error('Only image files are allowed (jpg, jpeg, png, gif)'), false);
        }

        // Optionally, set a max file size (e.g., 5MB)
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB
        if (file.size > MAX_SIZE) {
          return callback(new Error('File size should not exceed 5MB'), false);
        }

        callback(null, true);
      },
    };
  }

  // URL generation logic if you need to generate URLs
  getFileUrl(filename: string): string {
    const hostUrl = process.env.HOST_URL || 'http://localhost:3000'; // Default to localhost if not set
    return `${hostUrl}/uploads/${filename}`; // Assuming the files are served statically
  }
}
