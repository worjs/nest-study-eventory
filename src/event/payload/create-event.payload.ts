import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateEventPayload {
  @IsInt()
  @ApiProperty({
    description: '호스트 ID',
    type: Number,
  })
  hostId!: number;

  @IsString()
  @ApiProperty({
    description: '모임 이름',
    type: Number,
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: '모임 설명',
    type: String,
  })
  description!: string;

  @IsInt()
  @ApiProperty({
    description: '카테고리 ID',
    type: Number,
  })
  categoryId!: number;

  @IsInt()
  @ApiProperty({
    description: '도시 ID',
    type: Number,
  })
  cityId!: number;

  @IsInt()
  @ApiProperty({
    description: '시작 시간',
    type: Date,
  })
  startTime!: Date;

  @IsInt()
  @ApiProperty({
    description: '종료 시간',
    type: Date,
  })
  endTime!: Date;

  @IsInt()
  @ApiProperty({
    description: '최대 인원',
    type: Number,
  })
  maxPeople!: number;














  };


