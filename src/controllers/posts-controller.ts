import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { title } from "process";
import { PostSchema } from "../utils/types.ts";

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
    const dummyData = {
      title: "Found lost wallet",
      longitude: -122.4194,
      latitude: 37.7749,
      img: "https://example.com/images/lost-wallet.jpg",
      description:
        "A wallet was found near the park. It contains cards and some cash.",
      urgency: "High",
      tags: ["wallet", "lost", "urgent"],
      PostType: "Found",
      PostStatus: "Open",
    };

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

    const newPost: PostSchema = await knex("posts").insert({
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
