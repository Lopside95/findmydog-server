import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { title } from "process";
import { PostSchema, TagSchema } from "../utils/schemas.ts";
import { Post } from "../utils/types.ts";

const knex = initKnex(knexConfig);

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: Post[] = await knex("posts");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};
const getPostsWithTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const postsWithTags: Post[] = await knex("posts")
      .leftJoin("posts_tags", "posts.id", "posts_tags.post_id")
      .leftJoin("tags", "tags.id", "posts_tags.tag_id")
      .select(
        "posts.*",
        knex.raw(
          "JSON_ARRAYAGG(JSON_OBJECT('id', tags.id, 'name', tags.name)) as tags"
        )
      )
      .groupBy("posts.id");

    res.status(200).json(postsWithTags);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const tags = data.tags;

    const newPostIds: PostSchema[] = await knex("posts").insert({
      title: data.title,
      longitude: data.longitude,
      latitude: data.latitude,
      img: data.img,
      description: data.description,
      urgency: data.urgency,
      type: data.PostType,
      status: data.PostStatus,
    });

    tags.forEach(async (tag: TagSchema) => {
      await knex("posts_tags").insert({
        post_id: newPostIds[0],
        tag_id: tag.id,
      });
    });

    const newPost = await knex("posts").where({ id: newPostIds[0] }).first();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({
      message: "There was an error creating this post",
      error,
    });
    console.error(error);
  }
};

export { getAllPosts, createPost, getPostsWithTags };
