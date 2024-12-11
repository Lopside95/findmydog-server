import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { title } from "process";
import { PostSchema, TagSchema } from "../utils/schemas";
import { Post } from "../utils/types";
const knex = initKnex(knexConfig);

import bcrypt from "bcrypt";

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
  return await knex("posts")
    .leftJoin("posts_tags", "posts.id", "posts_tags.post_id")
    .leftJoin("tags", "tags.id", "posts_tags.tag_id")
    .select(
      "posts.*",
      knex.raw(
        "JSON_ARRAYAGG(JSON_OBJECT('id', tags.id, 'name', tags.name)) as tags"
      )
    )
    .groupBy("posts.id")
    .where({ "posts.id": id })
    .first();
};

const getPosts = async () => {
  return await knex("posts")
    .select(
      "posts.*",
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
    .groupBy("posts.id");
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

//   const hashedPaass  = (req.body.password, SALT_ROUNDS, async (err, hashedPassword) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ message: "Couldn't encrypt the supplied password" });

// }
//   })

//   bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hashedPassword) => {

export { getPostsAndTags, getSinglePostById, getPosts, hashPassword };
