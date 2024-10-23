import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EventService } from './event.service';

@Controller('events')
@ApiTags('Events API')
export class EventController {
  constructor(private readonly eventService: EventService) {}
}
