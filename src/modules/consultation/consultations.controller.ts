import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    UseGuards,
  } from '@nestjs/common';
  import { ConsultationsService } from './consultations.service';
  import { ConsultDto } from './consult.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from '../auth/roles.enum';
import { Roles } from 'src/decorators/roles.decorator';
import { Throttle } from '@nestjs/throttler';
  
  @Controller('consultations')
  export class ConsultationsController {
    constructor(private readonly consultationsService: ConsultationsService) {}
    
    @Throttle({
        default: {
          limit: 1,
          ttl: 100000,
        },
      }) 
    @Post()
    create(@Body() consultDto: ConsultDto) {
      return this.consultationsService.create(consultDto);
    }

    @Throttle({
        default: {
          limit: 2,
          ttl: 100000,
        },
      }) 
    @Get()
    findAll() {
      return this.consultationsService.findAll();
    }

    @UseGuards(AuthGuard,RoleGuard) 
    @Roles(Role.Admin)
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.consultationsService.findOne(id);
    }
    @UseGuards(AuthGuard,RoleGuard) 
    @Roles(Role.Admin)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDto: Partial<ConsultDto>) {
      return this.consultationsService.update(id, updateDto);
    }
  @UseGuards(AuthGuard,RoleGuard) 
    @Roles(Role.Admin)
    @Delete(':id')
    remove(@Param('id') id: string) {
      this.consultationsService.remove(id);
    }
  }
  