import { Module } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthModule } from '../auth/auth.module';
import { ConsultationsController } from './consultations.controller';
import { ConsultationsService } from './consultations.service';

@Module({
  imports: [AuthModule ], 

  controllers: [ConsultationsController],
  providers: [ConsultationsService, PrismaService],
})
export class ConsultationsModule {}
