export type Tag = {
  id: string;
  name: string;
};

export interface PostInterface {
  post?: Post;
}

export type Post = {
  id: string;
  title: string;
  img?: string;
  description: string;
  urgency: number;
  type: PostType;
  status: PostStatus;
  tags: Tag[];
  longitude?: number;
  latitude?: number;
  created_at: Date;
  updated_at: Date;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  active: boolean;
  posts: Post[];
  created_at: Date;
  updated_at: Date;
};

export enum PostType {
  "GENERAL",
  "REPORT",
}

export enum PostStatus {
  "OPEN",
  "CLOSED",
}

// import z from "zod";

// export const tag = z.object({
//   id: z.string(),
//   name: z.string(),
//   // active: z.boolean(),
// });

// export const postSchema = z.object({
//   // id: z.string(),
//   title: z.string(),
//   img: z.string().optional(),
//   description: z.string(),
//   urgency: z.number(),
//   type: z.enum(["General", "Report"]),
//   status: z.enum(["Open", "Closed"]),
//   tags: z.array(tag),
//   longitude: z.number().optional(),
//   latitude: z.number().optional(),
//   // created_at: z.date(),
//   // updated_at: z.date(),
// });

// export const userSchema = z.object({
//   id: z.string(),
//   firstName: z.string().min(1),
//   lastName: z.string(),
//   email: z.string().email(),
//   password: z.string(),
//   active: z.boolean(),
//   posts: z.array(postSchema),
//   created_at: z.date(),
//   updated_at: z.date(),
// });

// // export const commentSchema = z.object({

// // });

// export type User = z.infer<typeof userSchema>;
// export type Tag = z.infer<typeof tag>;
// export type Post = z.infer<typeof postSchema>;

// export type Post = {
//   id: number;
//   title: string;
//   longitude: number;
//   latitude: number;
//   img: string;
//   description: string;
//   urgency: number;
//   type: PostType;
//   status: PostStatus;
//   created_at: Date;
//   updated_at: Date;
// };
