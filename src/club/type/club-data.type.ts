import { ClubJoinStatus } from '@prisma/client';

export type ClubData = {
  id: number;
  title: string;
  description: string;
  leaderId: number;
  maxPeople: number;
  members: { userId: number; status: ClubJoinStatus }[];
};
