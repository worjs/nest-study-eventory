export type EventData = {
  id: number;
  title: string;
  description: string;
  hostId: number;
  categoryId: number;
  eventCity: {
    cityId: number;
  }[];
  startTime: Date;
  endTime: Date;
  maxPeople: number;
};
