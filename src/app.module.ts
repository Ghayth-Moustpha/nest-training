import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { CoursesModule } from './modules/courses/courses.module';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CategoryModule } from './modules/category/category.module';
import { BlogModule } from './modules/blog/blog.module';
import { APP_GUARD } from '@nestjs/core';
import { RoleGuard } from './guards/role.guard';
import { AuthGuard } from './guards/auth.guard';
import { TeacherModule } from './modules/teachers/teacher.module';
import { ConsultationsModule } from './modules/consultation/consultation.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  
  imports: [TeacherModule,AuthModule, CoursesModule, UserModule, BookmarkModule, FileUploadModule ,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Serve files from the uploads folder
    serveRoot: '/uploads', // Serve files at the /uploads route
  }),      ThrottlerModule.forRoot([{
    ttl: 3600,
    limit: 2,
  }]), CategoryModule, BlogModule , ConsultationsModule],

  controllers: [AppController],
  providers: [AppService
],
})
export class AppModule {}
