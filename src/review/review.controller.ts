import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ReviewDto } from './dto/review.dto';
import { CreateReviewPayload } from './payload/create-review.payload';

@Controller('reviews')
@ApiTags('Review API')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: '리뷰를 생성합니다' })
  @ApiCreatedResponse({ type: ReviewDto })
  async createReview(@Body() payload: CreateReviewPayload): Promise<ReviewDto> {
    return this.reviewService.createReview(payload);
  }
}
