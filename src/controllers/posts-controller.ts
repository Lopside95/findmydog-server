import { Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { PostSchema, TagSchema } from "../utils/schemas";
import { Post, PostWithUserDetails } from "../utils/types";
import { getPosts, getSinglePostById } from "../utils/helpers";
import { JWTRequest } from "../middleware/auth";

const knex = initKnex(knexConfig);

const getOnlyPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: Post[] = await knex("posts");
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
  }
};

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts: PostWithUserDetails[] = await getPosts();

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
    console.error(error);
  }
};

const getPostById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const post: Post = await getSinglePostById(id);

    res.status(200).json(post);
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
      // type: data.PostType,
      status: data.PostStatus,
      user_id: req.body.token.id,
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
      message: "There was an error creating this post" + error,
    });
    console.error(error);
  }
};

const deletePost = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const user_id = req.body.token.id;

    await knex("posts").where({ id: id }).del();
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error deleting this post " + error });
    console.error(error);
  }
};

export { getAllPosts, createPost, getPostById, getOnlyPosts, deletePost };
