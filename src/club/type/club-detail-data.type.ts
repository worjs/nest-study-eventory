export type ClubDetailData = {
  id: number;
  name: string;
  description: string;
  leaderId: number;
  maxPeople: number;
  createdAt: Date;
  updatedAt: Date;
  members: {
    user: {
      id: number;
      name: string;
    };
  }[];
};
