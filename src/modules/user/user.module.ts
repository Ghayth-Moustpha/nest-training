import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [AuthModule ], // Add AuthModule here
  providers: [UserService, PrismaService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
