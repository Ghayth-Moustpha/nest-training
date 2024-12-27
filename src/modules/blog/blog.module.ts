import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule ], // Add AuthModule here
  providers: [BlogService ,PrismaService],
  controllers: [BlogController], 
  exports:[BlogService]
})
export class BlogModule {}
