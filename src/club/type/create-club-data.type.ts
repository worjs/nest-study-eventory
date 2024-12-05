export type CreateClubData = {
  title: string;
  description: string;
  leaderId: number;
  maxPeople: number;
  members: { userId: number }[];
};
