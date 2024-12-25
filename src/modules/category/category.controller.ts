import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

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

  @Patch(':id')
    async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
  return this.categoryService.update(+id, updateCategoryDto);
}

  @Delete(':id')
  async delete(@Param('id') id: number) {
    await this.categoryService.delete(+id);
    return { message: `Category with ID ${id} deleted successfully` };
  }
}
