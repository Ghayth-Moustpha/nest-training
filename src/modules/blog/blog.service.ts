import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'; // Ensure this service is created to interact with your Prisma client
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new blog
  async createBlog(createBlogDto: CreateBlogDto, adminId: number) {
    return await this.prisma.blog.create({
      data: {
        ...createBlogDto,
        adminId,
      },
    });
  }

  // Get all blogs
  async getAllBlogs() {
    return await this.prisma.blog.findMany({
      include: { author: true }, // Include the author details if needed
    });
  }

  // Get a blog by its ID
  async getBlogById(id: number) {
    const blog = await this.prisma.blog.findUnique({
      where: { id },
      include: { author: true }, // Include the author details if needed
    });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    return blog;
  }

  // Update a blog by its ID
  async updateBlog(id: number, updateBlogDto: UpdateBlogDto, adminId: number) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    if (blog.adminId !== adminId) {
      throw new UnauthorizedException('You are not authorized to update this blog');
    }

    return await this.prisma.blog.update({
      where: { id },
      data: { ...updateBlogDto },
    });
  }

  // Delete a blog by its ID
  async deleteBlog(id: number, adminId: number) {
    const blog = await this.prisma.blog.findUnique({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    if (blog.adminId !== adminId) {
      throw new UnauthorizedException('You are not authorized to delete this blog');
    }

    return await this.prisma.blog.delete({ where: { id } });
  }
}
