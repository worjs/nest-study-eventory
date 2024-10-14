import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
<<<<<<< HEAD

@Module({
  controllers: [CategoryController],
  providers: [CategoryService]
=======
import { CategoryRepository } from './category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository]
>>>>>>> bdbee3c (Category folder changed)
})
export class CategoryModule {}
