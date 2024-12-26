import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    ParseIntPipe,
  } from '@nestjs/common';
  import { BlogService } from './blog.service';
  import { Blog } from '@prisma/client';
  import { CreateBlogDto } from './dto/create-blog.dto';
  import { UpdateBlogDto } from './dto/update-blog.dto';
  
  @Controller('blogs')
  export class BlogController {
    constructor(private readonly blogService: BlogService) {}
  
    @Post()
    async createBlog(@Body() createBlogDto: CreateBlogDto): Promise<Blog> {
      return this.blogService.createBlog(createBlogDto);
    }
  
    @Get()
    async getAllBlogs(): Promise<Blog[]> {
      return this.blogService.getAllBlogs();
    }
  
    @Get(':id')
    async getBlogById(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
      return this.blogService.getBlogById(id);
    }
  
    @Put(':id')
    async updateBlog(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateBlogDto: UpdateBlogDto,
    ): Promise<Blog> {
      return this.blogService.updateBlog(id, updateBlogDto);
    }
  
    @Delete(':id')
    async deleteBlog(@Param('id', ParseIntPipe) id: number): Promise<Blog> {
      return this.blogService.deleteBlog(id);
    }
  }
  