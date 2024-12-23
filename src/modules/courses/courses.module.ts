import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { ImageUploadService } from 'src/services';
@Module({
  controllers: [CourseController],
  providers: [CourseService, ImageUploadService, PrismaService],
})
export class CoursesModule {}
