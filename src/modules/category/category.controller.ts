import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from '../auth/roles.enum';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Patch(':id')
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }
  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.categoryService.findOne(+id);
  }
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Patch(':id')
    async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
  return this.categoryService.update(+id, updateCategoryDto);
}
  @UseGuards(AuthGuard,RoleGuard) 
  @Roles(Role.Admin)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.categoryService.delete(+id);
    return { message: `Category with ID ${id} deleted successfully` };
  }
}
