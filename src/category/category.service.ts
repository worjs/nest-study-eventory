import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryListDto } from './dto/category.dto';
import { CategoryData } from './type/category-data.type';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async findAllCategorys(): Promise<CategoryListDto> {
    const categorys: CategoryData[] =
      await this.categoryRepository.findAllCategorys();

    return CategoryListDto.from(categorys);
  }
}
