import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsDate, Min } from 'class-validator';

export class CreateEventPayload {
  @IsInt()
  @ApiProperty({
    description: '호스트 ID',
    type: Number,
  })
  hostId!: number;

  @IsString()
  @ApiProperty({
    description: '이벤트 제목',
    type: String,
  })
  title!: string;

  @IsString()
  @ApiProperty({
    description: '이벤트 내용',
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
    description: '지역 ID',
    type: Number,
  })
  cityId!: number;

  @IsDate()
  @ApiProperty({
    description: '시작 시간',
    type: Date,
  })
  startTime!: Date;

  @IsDate()
  @ApiProperty({
    description: '종료 시간',
    type: Date,
  })
  endTime!: Date;

  @IsInt()
  @Min(1)
  @ApiProperty({
    description: '최대 인원',
    type: Number,
  })
  maxPeople!: number;
}
