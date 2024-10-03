import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CategoriesData } from './type/categories-data.type';

@Injectable()
export class CategoriesRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories(): Promise<CategoriesData[]> {
    return this.prisma.region.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
