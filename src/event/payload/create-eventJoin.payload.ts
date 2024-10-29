import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { min } from 'lodash';
import { Type } from 'class-transformer';

export class CreateEventJoinPayload {
  @IsInt()
  @ApiProperty({
    description: '참가자 ID',
    type: Number,
  })
  userId!: number;

  @IsInt()
  @ApiProperty({
    description: '모임 ID',
    type: Number,
  })
  eventId!: number;
}
