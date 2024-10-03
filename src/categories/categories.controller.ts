import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { Category } from '@prisma/client';
import { CategoriesListDto } from './dto/categories.dto';

@Controller('categories')
@ApiTags('Categories API')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ summary: '모든 카테고리 리스트' })
  @ApiOkResponse({ type: CategoriesListDto })
  async findAllCategories(): Promise<CategoriesListDto> {
    return this.categoriesService.findAllCategories();
  }
}
