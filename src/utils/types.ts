export type Tag = {
  id: number;
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
  // type: PostType;
  status: PostStatus;
  tags: Tag[];
  longitude?: number;
  latitude?: number;
  created_at: Date;
  updated_at: Date;
  user_id?: string;
};

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  active: boolean;
  posts: Post[];
  created_at: Date;
  updated_at: Date;
};

export interface PostWithUserDetails extends Post {
  first_name: string;
  last_name: string;
}
// export interface PostWithUserDetails extends Post {
//   user: {
//     firstName: string;
//     lastName: string;
//   };
// }

export type UserComment = {
  id: string;
  content: string;
  user: User;
  post: Post;
  created_at: Date;
  updated_at: Date;
};

// export enum PostType {
//   "LOST",
//   "FOUND",
//   "SIGHTING",
// }

export enum PostStatus {
  "FOUND",
  "MISSING",
  "SEEN",
}
