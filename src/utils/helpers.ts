import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { title } from "process";
import { PostSchema, TagSchema } from "../utils/schemas.ts";
import { Post } from "../utils/types.ts";
const knex = initKnex(knexConfig);

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
    .first();
};

export { getPostsAndTags, getSinglePostById };
