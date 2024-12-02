import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { title } from "process";
import { PostSchema, TagSchema } from "../utils/types.ts";

const knex = initKnex(knexConfig);

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: PostSchema[] = await knex("posts");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    console.log(req.body);
    // res.status(500).send(req.body);

    const tags = req.body.tags;

    const newPostIds: PostSchema[] = await knex("posts").insert({
      title: data.title,
      longitude: data.longitude,
      latitude: data.latitude,
      img: data.img,
      description: data.description,
      urgency: data.urgency,
      type: data.PostType,
      status: data.PostStatus,
      // created_at: new Date(),
      // updated_at: new Date(),
    });

    console.log(newPostIds);

    tags.forEach(async (tag: TagSchema) => {
      await knex("posts_tags").insert({
        post_id: newPostIds[0],
        tag_id: tag.id,
      });
    });

    // const postAndTags = await knex("posts_tags").insert({post_id: })

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

export { getAllPosts, createPost };

// const newPost = await knex("posts").insert({
//   title: dummyData.title,
//   longitude: dummyData.longitude,
//   latitude: dummyData.latitude,
//   img: dummyData.img,
//   description: dummyData.description,
//   urgency: dummyData.urgency,
//   tags: dummyData.tags,
//   type: dummyData.PostType,
//   status: dummyData.PostStatus,
//   created_at: new Date(),
//   updated_at: new Date(),
// });
