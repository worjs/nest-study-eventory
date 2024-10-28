import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventDto, EventListDto } from './dto/event.dto';
import { CreateEventData } from './type/create-event-data.type';
import { EventQuery } from './query/event.query';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async createEvent(payload: CreateEventPayload): Promise<EventDto> {
    /*const isEventExist = await this.eventRepository.isEventExist(
      payload.hostId,
    );
    if (isEventExist) {
      throw new ConflictException('해당 호스트의 모임이 이미 존재합니다.');
    }*/

    /*const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(
      payload.userId,
      payload.eventId,
    );
    if (!isUserJoinedEvent) {
      throw new ConflictException('해당 유저가 이벤트에 참가하지 않았습니다.');
    }
      */

    const event1 = await this.eventRepository.getEventById(payload.hostId);
    if (!event1) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event1.startTime < new Date()) {
      throw new ConflictException(
        '모임이 이미 시작되었습니다. 수정/ 삭제가 불가능합니다.',
      );
    }
    /*
    if (event1.hostId === payload.hostId) {
      throw new ConflictException(
        '자신이 주최한 이벤트에는 리뷰를 작성 할 수 없습니다.',
      );
    }
    */

    const user = await this.eventRepository.getHostById(payload.hostId);
    if (!user) {
      throw new NotFoundException('host가 존재하지 않습니다.');
    }

    const user2 = await this.eventRepository.getHostByCategoryId(
      payload.categoryId,
    );
    if (!user2) {
      throw new NotFoundException('category가 존재하지 않습니다.');
    }

    const user3 = await this.eventRepository.getHostByCityId(payload.cityId);
    if (!user3) {
      throw new NotFoundException('city가 존재하지 않습니다.');
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

  async getEventByEventId(eventId: number): Promise<EventDto> {
    const event = await this.eventRepository.getEventById(eventId);

    if (!event) {
      throw new NotFoundException('event가 존재하지 않습니다.');
    }

    return EventDto.from(event);
  }

  async getEvents(query: EventQuery): Promise<EventListDto> {
    const events = await this.eventRepository.getEvents(query);

    return EventListDto.from(events);
  }

  async joinEvent(eventId: number, userId: number): Promise<void> {
    const isUserJoinedEvent = await this.eventRepository.isUserJoinedEvent(
      userId,
      eventId,
    );
    if (isUserJoinedEvent) {
      throw new ConflictException('해당 유저가 이미 참가한 이벤트입니다.');
    }

    const event = await this.eventRepository.getEventById(eventId);
    if (!event) {
      throw new NotFoundException('Event가 존재하지 않습니다.');
    }

    if (event.maxPeople == 0) {
      throw new ConflictException('이미 정원이 다 찼습니다.');
    }
    event.maxPeople = event.maxPeople - 1;

    await this.eventRepository.joinEvent(eventId, userId);
  }
}
