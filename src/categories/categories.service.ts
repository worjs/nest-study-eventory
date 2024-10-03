import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoriesListDto } from './dto/categories.dto';
import { CategoriesData } from './type/categories-data.type';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findAllCategories(): Promise<CategoriesListDto> {
    const categories: CategoriesData[] = await this.categoriesRepository.findAllCategories();

    return CategoriesListDto.from(categories);
  }
}