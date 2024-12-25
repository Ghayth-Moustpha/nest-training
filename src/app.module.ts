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

@Module({
  imports: [AuthModule, CoursesModule, UserModule, BookmarkModule, FileUploadModule ,ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'uploads'), // Serve files from the uploads folder
    serveRoot: '/uploads', // Serve files at the /uploads route
  }), CategoryModule],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
