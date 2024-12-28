import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

import { AuthModule } from '../auth/auth.module';
import { TeachersService } from './teacher.service';
import { TeachersController } from './teacher.controller';

@Module({
    imports: [AuthModule ], // Add AuthModule here
  providers: [TeachersService , PrismaService],
  controllers: [TeachersController],
  exports: [TeachersService],
})
export class TeacherModule {}
