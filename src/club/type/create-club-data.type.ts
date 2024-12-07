import { ClubJoinStatus } from '@prisma/client';

export type CreateClubData = {
  title: string;
  description: string;
  leaderId: number;
  maxPeople: number;
  members: { userId: number; status: ClubJoinStatus }[];
};
