import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { EventRepository } from './event.repository';
import { CreateEventData } from './type/create-event-data.type';
import { CreateEventPayload } from './payload/create-event.payload';
import { EventDto } from './dto/event.dto';

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
}
