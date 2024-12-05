import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { title } from "process";
import { CommentSchema, PostSchema, TagSchema } from "../utils/schemas.ts";
import { Post } from "../utils/types.ts";
import { getPostsAndTags, getSinglePostById } from "../utils/helpers.ts";
import { getPostById } from "./posts-controller.ts";

const knex = initKnex(knexConfig);

const getCommentsByPost = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const id = req.params.id;
    const post = await getSinglePostById(id);

    const comments = await knex("comments").where({ post_id: post.id });

    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
  }
};

const createComment = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    const payload = req.body;

    const newComment: CommentSchema[] = await knex("comments").insert({
      content: payload.content,
      post_id: id,
      // user_id would be found by which user is logged in/ the sesssion
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
  }
};

export { getCommentsByPost, createComment };
