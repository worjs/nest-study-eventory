import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get(':reviewId')
  @ApiOperation({ summary: '리뷰 상세 정보를 가져옵니다' })
  @ApiOkResponse({ type: ReviewDto })
  async getReview(
    @Param('reviewId', ParseIntPipe) reviewId: number,
  ): Promise<ReviewDto> {
    return this.reviewService.getReviewById(reviewId);
  }
}
