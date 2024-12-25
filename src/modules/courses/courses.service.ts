import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
  

    return this.prisma.course.create({
      data: {
    ...createCourseDto, 
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany();
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({ where: { id } });
    if (!course) {
      throw new NotFoundException('Course not found');
    }
    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto, ) {
    return this.prisma.course.update({
      where: { id },
      data: { ...updateCourseDto },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure course exists
    return this.prisma.course.delete({ where: { id } });
  }
}
