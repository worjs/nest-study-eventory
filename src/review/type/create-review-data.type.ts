export type CreateReviewData = {
  eventId: string;
  userId: string;
  score: number;
  title: string;
  description?: string | null;
};
