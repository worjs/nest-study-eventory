import { ApiProperty } from '@nestjs/swagger';

export class ReviewDto {
  @ApiProperty({
    description: '리뷰 ID',
    type: Number,
  })
  id!: number;

  @ApiProperty({
    description: '모임 ID',
    type: String,
  })
  eventId!: string;

  @ApiProperty({
    description: '유저 ID',
    type: String,
  })
  userId!: string;

  @ApiProperty({
    description: '별점',
    type: Number,
  })
  score!: number;

  @ApiProperty({
    description: '리뷰 제목',
    type: String,
  })
  title!: string;

  @ApiProperty({
    description: '리뷰 내용',
    type: String,
    nullable: true,
  })
  description!: string | null;
}
