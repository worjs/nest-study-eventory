import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class EventQuery {
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiPropertyOptional({
        description: '호스트 ID',
        type: Number,
    })
    hostId?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiPropertyOptional({
        description: '카테고리 ID',
        type: Number,
    })
    categoryId?: number;

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @ApiPropertyOptional({
        description: '도시 ID',
        type: Number,
    })
    cityId?: number;
}