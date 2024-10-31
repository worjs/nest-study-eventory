import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PutUpdateEventPayload {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '모임 이름',
    type: String,
  })
  title!: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({
    description: '모임 설명',
    type: String,
  })
  description!: string;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '카테고리 ID',
    type: Number,
  })
  categoryId!: number;

  @IsOptional()
  @IsInt()
  @ApiPropertyOptional({
    description: '도시 ID',
    type: Number,
  })
  cityId!: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: '시작 시간',
    type: Date,
  })
  startTime!: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiPropertyOptional({
    description: '종료 시간',
    type: Date,
  })
  endTime!: Date;

  @IsOptional()
  @IsInt()
  @Min(1)
  @ApiPropertyOptional({
    description: '최대 인원',
    type: Number,
  })
  maxPeople!: number;
}
