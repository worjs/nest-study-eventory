import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateReviewPayload {
  @IsString()
  @ApiProperty({
    description: '모임 ID',
    type: String,
  })
  eventId!: string;

  @IsString()
  @ApiProperty({
    description: '유저 ID',
    type: String,
  })
  userId!: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @ApiProperty({
    description: '별점',
    type: Number,
  })
  score!: number;

  @IsString()
  @ApiProperty({
    description: '리뷰 제목',
    type: String,
  })
  title!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '리뷰 내용',
    type: String,
    nullable: true,
  })
  content?: string | number;
}
