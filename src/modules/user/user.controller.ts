import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterStudentDto, CreateAdminDto, CreateTeacherDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register/student')
  async registerStudent(@Body() dto: RegisterStudentDto) {
    return this.userService.registerStudent(dto);
  }

  @Post('register/admin')
  async createAdmin(@Body() dto: CreateAdminDto) {
    return this.userService.createAdmin(dto);
  }

  @Post('register/teacher')
  async createTeacher(@Body() dto: CreateTeacherDto) {
    return this.userService.createTeacher(dto);
  }
}
