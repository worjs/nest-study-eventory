import { ApiProperty } from '@nestjs/swagger';
import { CategoriesData } from '../type/categories-data.type';


export class CategoriesDto {
  @ApiProperty({
    description: '카테고리 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '카테고리 이름',
    type: String,
  })
  name!: string;

  static from(category: CategoriesData): CategoriesDto {
    return {
      id: category.id,
      name: category.name,
    };
  }

  static fromArray(category: CategoriesData[]): CategoriesDto[] {
    return category.map((categories) => this.from(categories));
  }
}

export class CategoriesListDto {
  @ApiProperty({
    description: '카테고리 목록',
    type: [CategoriesDto],
  })
  categories!: CategoriesDto[];

  static from(categories: CategoriesData[]): CategoriesListDto {
    return {
      categories: CategoriesDto.fromArray(categories),
    };
  }
}