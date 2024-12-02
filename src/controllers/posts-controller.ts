import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { Post } from "../utils/types.ts";
import { title } from "process";

const knex = initKnex(knexConfig);

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: Post[] = await knex("posts");

    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};

const createPost = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = req.body;

    const newPost: Post = await knex("posts").insert({
      title: data.title,
      longitude: data.longitude,
      latitude: data.latitude,
      img: data.img,
      description: data.description,
      urgency: data.urgency,
      tags: data.tags,
      type: data.PostType,
      status: data.PostStatus,
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({ newPost });
  } catch (error) {
    res.status(500).json({
      message: "There was an error creating this post",
      error,
    });
    console.error(error);
  }
};

export { getAllPosts, createPost };
