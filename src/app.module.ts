import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BookmarkModule } from './modules/bookmark/bookmark.module';
import { CoursesModule } from './modules/courses/courses.module';

@Module({
  imports: [AuthModule, CoursesModule, UserModule, BookmarkModule ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
