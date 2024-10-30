import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Query,
  HttpCode,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiOperation,
  ApiOkResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { EventService } from './event.service';
import { EventDto, EventListDto } from './dto/event.dto';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventQuery } from './query/event.query';
import { JoinEventPayload } from './payload/join-event.payload';
@Controller('events')
@ApiTags('Events API')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({ summary: '모임을 생성합니다' })
  @ApiCreatedResponse({ type: EventDto })
  async createEvent(@Body() payload: CreateEventPayload): Promise<EventDto> {
    return this.eventService.createEvent(payload);
  }

  @Get(':eventId')
  @ApiOperation({ summary: '특정 ID 의 모임 데이터를 가져옵니다' })
  @ApiOkResponse({ type: EventDto })
  async getEventById(
    @Param('eventId', ParseIntPipe) eventId: number,
  ): Promise<EventDto> {
    return this.eventService.getEventById(eventId);
  }

  @Get()
  @ApiOperation({ summary: '여러 개의 모임 데이터를 가져옵니다' })
  @ApiOkResponse({ type: EventListDto })
  async getEvents(@Query() query: EventQuery): Promise<EventListDto> {
    return this.eventService.getEvents(query);
  }

  @Post(':eventId/join')
  @ApiOperation({ summary: '사용자를 특정 ID의 모임에 참여시킵니다' })
  @ApiNoContentResponse({ description: '성공적으로 참여했습니다' })
  @HttpCode(204)
  async joinEvent(
    @Param('eventId', ParseIntPipe) eventId: number,
    @Body() payload: JoinEventPayload,
  ): Promise<void> {
    await this.eventService.joinEvent(eventId, payload);
  }
}
