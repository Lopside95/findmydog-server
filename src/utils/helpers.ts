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

export { getPostsAndTags, getSinglePostById, getPosts };
