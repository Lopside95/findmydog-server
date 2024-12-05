import z from "zod";

// export const tag = z.string();

export const tag = z.object({
  id: z.number(),
  name: z.string(),
});

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
  //tags
  // descriptive tags
  // color
  // breed
  // size - s, m, l
  //

  // condition tags
});

export const userSchema = z.object({
  first_name: z.string().min(1),
  last_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  active: z.boolean().default(true),
});

export const commentSchema = z.object({
  content: z.string(),
  post_id: z.string(),
  user_id: z.string().optional(),
  // post: postSchema,
  // user: userSchema,
});

export type CommentSchema = z.infer<typeof commentSchema>;

// export type Comment = {
//   id: string;
//   content: string;
//   user: User;
//   post: Post;
//   created_at: Date;
//   updated_at: Date;
// };

export type PostSchema = z.infer<typeof postSchema>;
export type TagSchema = z.infer<typeof tag>;
export type UserSchema = z.infer<typeof userSchema>;
