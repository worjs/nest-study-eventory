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

  static from(categories: CategoriesData): CategoriesDto {
    return {
      id: categories.id,
      name: categories.name,
    };
  }

  static fromArray(categories: CategoriesData[]): CategoriesDto[] {
    return categories.map((categories) => this.from(categories));
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