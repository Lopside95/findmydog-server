import initKnex from "knex";
import knexConfig from "../../knexfile";

const knex = initKnex(knexConfig);

import bcrypt from "bcryptjs";
// import { storage } from "../firebase";

const SALT_ROUNDS = 10;

const getPostsAndTags = async () => {
  return await knex("posts")
    .leftJoin("posts_tags", "posts.id", "posts_tags.post_id")
    .leftJoin("tags", "tags.id", "posts_tags.tag_id")
    .select(
      "posts.*",
      knex.raw(
        "JSON_ARRAYAGG(JSON_OBJECT('id', tags.id, 'name', tags.name)) as tags"
      )
    )
    .groupBy("posts.id");
};

const getSinglePostById = async (id: string) => {
  const post = await knex("posts")
    .select("posts.*")
    .where({ "posts.id": id })
    .first();

  if (!post) {
    return null;
  }

  const tags = await knex("tags")
    .join("posts_tags", "tags.id", "posts_tags.tag_id")
    .where({ "posts_tags.post_id": id })
    .select("tags.id", "tags.name");

  const comments = await knex("comments")
    .where({ "comments.post_id": id })
    .select("comments.id", "comments.content", "comments.created_at");

  return {
    ...post,
    tags: tags.map((tag) => ({ id: tag.id, name: tag.name })),
    comments: comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
    })),
  };
};

const getPosts = async () => {
  return await knex("posts")
    .join("users", "users.id", "posts.user_id")
    .select(
      "posts.*",
      "users.first_name",
      "users.last_name",
      "users.email",
      knex("tags")
        .select(
          knex.raw(
            "JSON_ARRAYAGG(JSON_OBJECT('id', tags.id, 'name', tags.name))"
          )
        )
        .join("posts_tags", "tags.id", "posts_tags.tag_id")
        .whereRaw("posts_tags.post_id = posts.id")
        .as("tags"),
      knex("comments")
        .select(
          knex.raw(
            "JSON_ARRAYAGG(JSON_OBJECT('id', comments.id, 'content', comments.content, 'created_at', comments.created_at))"
          )
        )
        .whereRaw("comments.post_id = posts.id")
        .as("comments")
    )
    .groupBy("posts.id", "users.first_name", "users.last_name");
};

const hashPassword = async (password: string) => {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    return hash;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error(error);
    }
  }
};

const checkPassword = async (reqPassword: string, userPassword: string) => {
  const validPass = await bcrypt.compare(reqPassword, userPassword);

  if (!validPass) {
    return false;
  } else {
    return true;
  }
};

// export const uploadPhoto = async (
//   file: File,
//   path: string
// ): Promise<string> => {
//   const storageRef = ref(storage, path);
//   await uploadBytes(storageRef, file);
//   const url = await getDownloadURL(storageRef);
//   return url;
// };

export {
  getPostsAndTags,
  getSinglePostById,
  getPosts,
  hashPassword,
  checkPassword,
};
