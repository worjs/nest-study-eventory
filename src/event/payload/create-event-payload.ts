import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateEventPayload {
    @IsInt()
    @ApiProperty({
        description: '호스트',
        type: Number,
    })
    hostId!:number;

    @IsString()
    @ApiProperty({
        description: '제목',
        type:String,
    })
    title!:String;

    @IsString()
    @ApiProperty({
        description: '내용',
        type:String,
    })
    description!:String;

    @IsInt()
    @ApiProperty({
        description: '카테고리',
        type:Number,
    })
    categoryId!: number;

    @IsInt()
    @ApiProperty({
        description: '지역',
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
    endTime!:Date;

    @IsInt()
    @ApiProperty({
        description: '최대정원',
        type: Number,
    })
    maxPeople!: number;





}