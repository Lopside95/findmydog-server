import z from "zod";

export const tag = z.object({
  id: z.number(),
  name: z.string(),
});

export const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  img: z.string().optional(),
  description: z.string().min(1, { message: "Description is required" }),
  urgency: z.number().min(1),
  // type: z.enum(["LOST", "FOUND", "SIGHTING"]),
  status: z.enum(["MISSING", "FOUND", "SEEN"]),
  tags: z.array(tag),
  longitude: z.number().optional(),
  latitude: z.number().optional(),
  user_id: z.string().optional(),
});

export const userSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string().trim().email().toLowerCase().optional(),
  password: z.string().optional(),
  active: z.boolean().default(true),
});
export const updateUserSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string().trim().email().toLowerCase().optional(),
  password: z.string().optional(),
  // new_password: z.string().optional(),
  active: z.boolean().default(true),
});

export const clientUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string(),
  email: z.string().trim().email().toLowerCase(),
  password: z.string(),
});

export const commentSchema = z.object({
  content: z.string(),
});

export type CommentSchema = z.infer<typeof commentSchema>;
export type PostSchema = z.infer<typeof postSchema>;
export type TagSchema = z.infer<typeof tag>;
export type UserSchema = z.infer<typeof userSchema>;
export type ClientUserSchema = z.infer<typeof clientUserSchema>;
