import { Controller, Get } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get()
  findAll() {
    return 'find all ';
  }
  @Get(':id')
  findOne() {}
}
