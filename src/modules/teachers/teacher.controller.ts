import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TeachersService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teachersService.create(createTeacherDto);
  }

  @Get()
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teachersService.findOne(+id);
  }
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teachersService.update(+id, updateTeacherDto);
  }
  
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teachersService.remove(+id);
  }
}
