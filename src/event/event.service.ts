import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventData } from './type/create-event-data.type';
import { CreateEventPayload } from './payload/create-event.payload';
import { JoinEventPayload } from './payload/join-event.payload';
import { EventDto, EventListDto } from './dto/event.dto';
import { EventQuery } from './query/event.query';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(payload: CreateEventPayload): Promise<EventDto> {
    const [host, category, city] = await Promise.all([
      this.eventRepository.getHostById(payload.hostId),
      this.eventRepository.getCategoryById(payload.categoryId),
      this.eventRepository.getCityById(payload.cityId),
    ]);

    if (!host) {
      throw new NotFoundException('해당 Host가 존재하지 않습니다.');
    }

    if (!category) {
      throw new NotFoundException('해당 Category가 존재하지 않습니다.');
    }

    if (!city) {
      throw new NotFoundException('해당 City가 존재하지 않습니다.');
    }

    if (payload.startTime > payload.endTime) {
      throw new ConflictException(
        '시작 시간이 종료 시간보다 늦을 수 없습니다.',
      );
    }

    if (payload.startTime < new Date()) {
      throw new ConflictException(
        '시작 시간이 현재 시간보다 빠를 수 없습니다.',
      );
    }

    const createData: CreateEventData = {
      hostId: payload.hostId,
      title: payload.title,
      description: payload.description,
      categoryId: payload.categoryId,
      cityId: payload.cityId,
      startTime: payload.startTime,
      endTime: payload.endTime,
      maxPeople: payload.maxPeople,
    };

    const event = await this.eventRepository.createEvent(createData);

    return EventDto.from(event);
  }

  async getEventById(eventId: number): Promise<EventDto> {
    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    return EventDto.from(event);
  }

  async getEvents(query: EventQuery): Promise<EventListDto> {
    const events = await this.eventRepository.getEvents(query);

    return EventListDto.from(events);
  }

  async joinEvent(eventId: number, payload: JoinEventPayload): Promise<void> {
    const userId = payload.userId;
    const event = await this.eventRepository.getEventById(eventId);
    const userCount = await this.eventRepository.getParticipantsCount(eventId);

    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.endTime < new Date()) {
      throw new ConflictException('Event가 이미 종료되었습니다.');
    }

    if (userCount + 1 > event.maxPeople) {
      throw new ConflictException('Event가 꽉 찼습니다.');
    }

    if (await this.eventRepository.isUserExist(eventId, userId)) {
      throw new ConflictException('이미 참여한 사용자입니다.');
    }

    await this.eventRepository.joinEvent(eventId, userId);
  }
}
