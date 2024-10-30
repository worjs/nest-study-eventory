export type EventData = {
  id: number;
  hostId: number;
  title: string;
  description: string;
  categoryId: number;
  cityId: number;
  startTime: Date;
  endTime: Date;
  maxPeople: number;
  eventJoin: EventJoinData[];
};

export type EventJoinData = {
  id: number;
  eventId: number;
  userId: number;
};
