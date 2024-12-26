import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Blog, Prisma } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async createBlog(data: CreateBlogDto): Promise<Blog> {
    return this.prisma.blog.create({
      data,
    });
  }

  async getAllBlogs(): Promise<Blog[]> {
    return this.prisma.blog.findMany({
      include: { author: true },
    });
  }

  async getBlogById(id: number): Promise<Blog> {
    return this.prisma.blog.findUnique({
      where: { id },
      include: { author: true },
    });
  }

  async updateBlog(id: number, data: UpdateBlogDto): Promise<Blog> {
    return this.prisma.blog.update({
      where: { id },
      data,
    });
  }

  async deleteBlog(id: number): Promise<Blog> {
    return this.prisma.blog.delete({
      where: { id },
    });
  }
}
