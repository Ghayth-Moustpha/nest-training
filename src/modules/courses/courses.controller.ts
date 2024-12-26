import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './courses.service';
import { CourseFiltersDto, CreateCourseDto, UpdateCourseDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Role } from '../auth/roles.enum';
import { Roles } from '../../decorators/roles.decorator';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  async findAll(@Query() filters: CourseFiltersDto) {
    return this.courseService.findAll(filters);
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.update(+id, updateCourseDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
