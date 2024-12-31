import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseFiltersDto } from './dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const { categories, ...courseData } = createCourseDto;

    return this.prisma.course.create({
      data: {
        ...courseData,
        categories: {
          create: categories.map((categoryId) => ({ categoryId })),
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async findAll(filters: CourseFiltersDto) {
    const { categoryId, teacherId, minCost, maxCost, type, title } = filters;

    const whereClause: any = {
      ...(teacherId && { teacherId }),
      ...(type && { type }),
      ...(title && { title: { contains: title, mode: 'insensitive' } }), // Case-insensitive partial match
      ...(minCost || maxCost
        ? { cost: { gte: minCost || undefined, lte: maxCost || undefined } }
        : {}),
      ...(categoryId
        ? {
            categories: {
              some: { categoryId },
            },
          }
        : {}),
    };

    return this.prisma.course.findMany({
      where: whereClause,
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        categories: {
          include: {
            category: true,
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException('Course not found');
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const { categories, ...courseData } = updateCourseDto;

    return this.prisma.course.update({
      where: { id },
      data: {
        ...courseData,
       
      },
      include: {
        categories: true,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id); // Ensure course exists
    return this.prisma.course.delete({ where: { id } });
  }
}
