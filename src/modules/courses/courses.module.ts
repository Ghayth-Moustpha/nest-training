import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseController } from './courses.controller';
import { CourseService } from './courses.service';
import { ImageUploadService } from 'src/services';
import { AuthModule } from '../auth/auth.module';
import { AuthGuard } from 'src/guards/auth.guard';
@Module({
  imports: [AuthModule ], // Add AuthModule here
  controllers: [CourseController],
  providers: [CourseService, ImageUploadService, PrismaService ,AuthGuard],
})
export class CoursesModule {}
