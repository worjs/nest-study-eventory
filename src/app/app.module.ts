import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './modules/config.module';
import { LoggerMiddleware } from '../common/middlewares/logger.middleware';
import { RegionModule } from '../region/region.module';
import { CommonModule } from '../common/common.module';
import { CategoriesModule } from 'src/categories/categories.module';

@Module({
  imports: [configModule, RegionModule, CommonModule, CategoriesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
