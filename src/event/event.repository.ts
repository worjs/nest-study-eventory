import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../common/services/prisma.service';
import { CreateEventData } from './type/create-event-data.type';
import { EventData } from './type/event-data.type';
import { EventListQuery } from './query/event-list.query';
import { EventUpdatePayload } from './payload/event-update.payload';

@Injectable()
export class EventRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createEvent(data: CreateEventData): Promise<EventData> {
    return this.prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        hostId: data.hostId,
        categoryId: data.categoryId,
        cityId: data.cityId,
        startTime: data.startTime,
        endTime: data.endTime,
        maxPeople: data.maxPeople,
      },

      select: {
        id: true,
        title: true,
        description: true,
        hostId: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: {
        id: userId,
        // deletedAt: null,
      },
    });
  }

  async isCategoryExist(categoryId: number): Promise<boolean> {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    return !!category;
  }

  async isCityExist(cityId: number): Promise<boolean> {
    const city = await this.prisma.city.findUnique({
      where: {
        id: cityId,
      },
    });
    return !!city;
  }

  async getEventById(eventId: number): Promise<EventData | null> {
    return this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        hostId: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async getEvents(query: EventListQuery): Promise<EventData[]> {
    return await this.prisma.event.findMany({
      where: {
        categoryId: query.categoryId,
        cityId: query.cityId,
        hostId: query.hostId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        hostId: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  async joinUserToEvent(data: { eventId: number; userID: number }): Promise<{
    id: number;
    createdAt: Date;
    updatedAt: Date;
    eventId: number;
    userId: number;
  }> {
    return this.prisma.eventJoin.create({
      data: {
        eventId: data.eventId,
        userId: data.userID,
      },
    });
  }

  async isUserJoinedToEvent(eventId: number, userId: number): Promise<boolean> {
    const eventJoin = await this.prisma.eventJoin.findFirst({
      where: {
        eventId,
        userId,
      },
    });
    return !!eventJoin;
  }

  async getJoinedUserCount(eventId: number): Promise<number> {
    const joinCount = await this.prisma.eventJoin.count({
      where: {
        eventId: eventId,
      },
    });

    return joinCount;
  }

  async outUserFromEvent(data: {
    eventId: number;
    userID: number;
  }): Promise<void> {
    await this.prisma.eventJoin.delete({
      where: {
        eventId_userId: {
          eventId: data.eventId,
          userId: data.userID,
        },
      },
    });
  }

  async updateEvent(
    eventId: number,
    payload: EventUpdatePayload,
  ): Promise<EventData> {
    return this.prisma.event.update({
      where: {
        id: eventId,
      },
      data: payload,
      select: {
        id: true,
        title: true,
        description: true,
        hostId: true,
        categoryId: true,
        cityId: true,
        startTime: true,
        endTime: true,
        maxPeople: true,
      },
    });
  }

  // async getEventJoinUsers(eventId: number): Promise<User[]> {
  //   return this.prisma.eventJoin
  //     .findMany({
  //       where: {
  //         eventId: eventId,
  //       },
  //       select: {
  //         userId: true,
  //       },
  //     })
  //     .then((eventJoins) => {
  //       const userIds = eventJoins.map((eventJoin) => eventJoin.userId);
  //       return this.prisma.user.findMany({
  //         where: {
  //           id: {
  //             in: userIds,
  //           },
  //         },
  //       });
  //     });
  // }
}
