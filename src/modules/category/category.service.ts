import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Create a new category
  async create(createCategoryDto : CreateCategoryDto): Promise<Category> {
    return this.prisma.category.create({
      data: { ...createCategoryDto },
    });
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.prisma.category.findMany({
      include: { courses: true }, // Include related courses
    });
  }

  // Get a single category by ID
  async findOne(id: number): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: { courses: true },
    });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  // Update a category by ID
  async update(id: number, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    return this.prisma.category.update({
      where: { id },
      data: { ...updateCategoryDto },
    });
  }

  // Delete a category by ID
  async delete(id: number): Promise<void> {
    const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    await this.prisma.category.delete({ where: { id } });
  }
}
