import z from "zod";

// export const tag = z.string();

export const tag = z.object({
  id: z.number(),
  name: z.string(),
});

// export const postSchema = z.object({
//   title: z.string(),
//   img: z.string().optional(),
//   description: z.string(),
//   urgency: z.number(),
//   type: z.enum(["General", "Report"]),
//   status: z.enum(["Open", "Closed"]),
//   tags: z.array(tag),
//   longitude: z.number().optional(),
//   latitude: z.number().optional(),
// });

export const postSchema = z.object({
  title: z.string(),
  img: z.string().optional(),
  description: z.string(),
  urgency: z.number(),
  type: z.enum(["General", "Report"]),
  status: z.enum(["Open", "Closed"]),
  tags: z.array(tag),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
});

export const userSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  active: z.boolean(),
  posts: z.array(postSchema),
});

export type PostSchema = z.infer<typeof postSchema>;
export type TagSchema = z.infer<typeof tag>;
export type UserSchema = z.infer<typeof userSchema>;
