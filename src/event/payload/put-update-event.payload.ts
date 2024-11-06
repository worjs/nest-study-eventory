import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class PutUpdateEventPayload {
    @IsString()
    @ApiProperty({
        description: '이벤트 제목',
        type: String,
    })
    title!: string;

    @IsString()
    @ApiProperty({
        description: '이벤트 설명',
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

    @ApiProperty({
        description: '시작 시간',
        type: Date,
    })
    startTime!: Date;

    @ApiProperty({
        description: '종료 시간',
        type: Date,
    })
    endTime!: Date;

    @ApiProperty({
        description: '최대 인원',
        type: Number,
    })
    maxPeople!: number;

}