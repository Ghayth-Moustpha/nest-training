import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { Blog } from '@prisma/client';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';
import { CustomRequest } from 'src/types/custom-request.interface';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Post()
  async createBlog(
    @Body() createBlogDto: CreateBlogDto,
    @Req() req: CustomRequest, 
    
  ) {
    
    const adminId = req.user.admin?.id;
    console.log (adminId) ;  
    return this.blogService.createBlog(createBlogDto, adminId);
  }

  @Get()
  async getAllBlogs() {
    return this.blogService.getAllBlogs();
  }

  @Get(':id')
  async getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getBlogById(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Put(':id')
  async updateBlog(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogDto,
    @Req() req: CustomRequest,
  ) {
    const adminId = req.user?.id; 
    return this.blogService.updateBlog(id, updateBlogDto, adminId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  async deleteBlog(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: CustomRequest,
  ) {
    const adminId = req.user?.id; 
    return this.blogService.deleteBlog(id, adminId);
  }
}
