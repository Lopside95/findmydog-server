export type Post = {
  id: number;
  title: string;
  longitude: number;
  latitude: number;
  img: string;
  description: string;
  urgency: number;
  type: PostType;
  status: string;
  created_at: Date;
  updated_at: Date;
};

export enum PostType {
  General = "GENERAL",
  Report = "REPORT",
}
