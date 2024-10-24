import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/services/prisma.service';
import { CreateEventData } from './type/create-event-data.type';
import { EventData } from './type/event-data.type';
import { User, Category, City } from '@prisma/client';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(data: CreateEventData): Promise<EventData> {
    return this.prisma.event.create({
      data: {
        hostId: data.hostId,
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        cityId: data.cityId,
        startTime: data.startTime,
        endTime: data.endTime,
        maxPeople: data.maxPeople,

        eventJoin: {
          create: [
            {
              userId: data.hostId,
            },
          ],
        },
      },

      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getHostById(hostId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: {
        id: hostId,
      },
    });
  }

  async getCategoryById(categoryId: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
  }

  async getCityById(cityId: number): Promise<City | null> {
    return this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });
  }

  async getEventById(eventId: number): Promise<EventData | null> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },

      select: {
        id: true,
        hostId: true,
        title: true,
        description: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }
}
