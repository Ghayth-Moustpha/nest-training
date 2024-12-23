import { Controller, Post, Get, Param, Body, Patch, Delete, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CourseService } from './courses.service';
import { CreateCourseDto ,UpdateCourseDto } from './dto';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createCourseDto: CreateCourseDto,
    @UploadedFile() imageFile?: Express.Multer.File,
  ) {
    return this.courseService.create(createCourseDto, imageFile);
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @UploadedFile() imageFile?: Express.Multer.File,
  ) {
    return this.courseService.update(+id, updateCourseDto, imageFile);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
