import { Module } from '@nestjs/common';
import { ReviewService } from './event.service';
import { ReviewController } from './event.controller';
import { ReviewRepository } from './event.repository';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
