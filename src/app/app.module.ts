import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configModule } from './modules/config.module';

@Module({
  imports: [configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
