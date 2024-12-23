import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, imageFile?: Express.Multer.File) {
    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : null;

    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        imageUrl,
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

  async update(id: number, updateCourseDto: UpdateCourseDto, imageFile?: Express.Multer.File) {
    const existingCourse = await this.findOne(id);

    const imageUrl = imageFile ? `/uploads/${imageFile.filename}` : existingCourse.imageUrl;

    return this.prisma.course.update({
      where: { id },
      data: { ...updateCourseDto, imageUrl },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure course exists
    return this.prisma.course.delete({ where: { id } });
  }
}
