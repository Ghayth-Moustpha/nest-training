import { Controller, Post, UseInterceptors, UploadedFile, Get, Param, Res, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { extname, join } from 'path';
import * as fs from 'fs';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('files')
export class FileUploadController {
  @UseGuards(AuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Save files to the uploads directory
        filename: (req, file, cb) => {
          const randomName = `${uuidv4()}${extname(file.originalname)}`;
          cb(null, randomName);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filePath: `/files/${file.filename}`, // Return the accessible file path
    };
  }

  @Get(':filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(process.cwd(), 'uploads', filename);
  
    if (!fs.existsSync(filePath)) {
      throw new HttpException('File not found', HttpStatus.NOT_FOUND);
    }
  
    return res.sendFile(filePath); 
  }
  
}
