import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterStudentDto, CreateAdminDto } from './dto';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register/student')
  async registerStudent(@Body() dto: RegisterStudentDto) {
    return this.userService.registerStudent(dto);
  }
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Post('register/admin')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.userService.createAdmin(dto);
  }

}
