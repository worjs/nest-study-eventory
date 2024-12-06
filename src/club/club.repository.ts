import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/services/prisma.service';
import { CreateClubData } from './type/create-club-data.type';
import { ClubData } from './type/club-data.type';
import { ClubJoinStatus } from '@prisma/client';
import { UpdateClubData } from './type/update-club-data.type';

@Injectable()
export class ClubRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createClub(data: CreateClubData): Promise<ClubData> {
    return this.prisma.club.create({
      data: {
        title: data.title,
        description: data.description,
        leaderId: data.leaderId,
        maxPeople: data.maxPeople,
        clubJoin: {
          create: {
            userId: data.leaderId,
            status: ClubJoinStatus.MEMBER,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        leaderId: true,
        maxPeople: true,
      },
    });
  }

  async getUserIsClubMember(userId: number, clubId: number): Promise<boolean> {
    const isClubMember = await this.prisma.clubJoin.findFirst({
      where: {
        userId,
        clubId,
        status: ClubJoinStatus.MEMBER,
      },
    });
    return !!isClubMember;
  }

  async getClubById(clubId: number): Promise<ClubData | null> {
    return this.prisma.club.findUnique({
      where: { id: clubId },
      select: {
        id: true,
        title: true,
        description: true,
        leaderId: true,
        maxPeople: true,
      },
    });
  }

  async getClubs(): Promise<ClubData[]> {
    return this.prisma.club.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        leaderId: true,
        maxPeople: true,
      },
    });
  }

  async getClubMembersCount(clubId: number): Promise<number> {
    return this.prisma.clubJoin.count({
      where: {
        clubId,
        status: ClubJoinStatus.MEMBER,
      },
    });
  }

  async updateClub(clubId: number, data: UpdateClubData): Promise<ClubData> {
    return this.prisma.club.update({
      where: { id: clubId },
      data: {
        title: data.title,
        description: data.description,
        leaderId: data.leaderId,
        maxPeople: data.maxPeople,
      },
      select: {
        id: true,
        title: true,
        description: true,
        leaderId: true,
        maxPeople: true,
      },
    });
  }

  async deleteClubWithEvents(clubId: number): Promise<void> {
    await this.prisma.$transaction(async (prisma) => {
      const startedEvents = await prisma.event.findMany({
        where: {
          clubId,
          startTime: {
            lt: new Date(),
          },
        },
      });
      if (startedEvents.length > 0) {
        throw new BadRequestException(
          '이미 시작된 클럽 전용 Event가 존재합니다. 클럽 삭제가 제한됩니다.',
        );
      }
      await prisma.event.deleteMany({
        where: {
          clubId,
        },
      });
      await prisma.clubJoin.deleteMany({
        where: { clubId },
      });
      await prisma.club.delete({
        where: {
          id: clubId,
        },
      });
    });
  }
}
