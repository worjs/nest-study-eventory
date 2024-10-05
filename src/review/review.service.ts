import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { CreateReviewPayload } from './payload/create-review.payload';
import { ReviewDto } from './dto/review.dto';
import { CreateReviewData } from './type/create-review-data.type';

@Injectable()
export class ReviewService {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async createReview(payload: CreateReviewPayload): Promise<ReviewDto> {
    const isReviewExist = await this.reviewRepository.isReviewExist(
      payload.userId,
      payload.eventId,
    );

    if (isReviewExist) {
      throw new ConflictException('해당 유저의 리뷰가 이미 존재합니다.');
    }

    const event = await this.reviewRepository.getEventById(payload.eventId);
    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.endTime > new Date()) {
      throw new ConflictException(
        'Event가 종료되지 않았습니다. 아직 리뷰를 작성할 수 없습니다.',
      );
    }

    const user = await this.reviewRepository.getUserById(payload.userId);
    if (!user) {
      throw new NotFoundException('User가 존재하지 않습니다.');
    }

    const createData: CreateReviewData = {
      userId: payload.userId,
      eventId: payload.eventId,
      score: payload.score,
      title: payload.title,
      description: payload.description,
    };

    const review = await this.reviewRepository.createReview(createData);

    return ReviewDto.from(review);
  }
}
