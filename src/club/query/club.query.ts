import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ClubQuery {
  @IsOptional()
  @Type(() => String)
  @ApiPropertyOptional({
    description: 'Club Name',
    type: String,
  })
  name?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @ApiPropertyOptional({
    description: 'LeaderID',
    type: Number,
  })
  leaderId?: number;
}