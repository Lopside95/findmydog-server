import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { title } from "process";
import { CommentSchema, PostSchema, TagSchema } from "../utils/schemas";
import { Post } from "../utils/types";
import { getPostsAndTags, getSinglePostById } from "../utils/helpers";
import { getPostById } from "./posts-controller";
import { JwtPayload } from "jsonwebtoken";
import { JWTRequest } from "../middleware/auth";

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
  // const token = req.token as JwtPayload;

  try {
    const newCommentsId: CommentSchema[] = await knex("comments").insert({
      content: req.body.content,
      post_id: req.params.id,
      user_id: req.body.token.id,
    });

    const newComment: CommentSchema = await knex("comments")
      .where({ id: newCommentsId[0] })
      .first();

    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "There was an error posting comment, " + error });
    console.error(error);
  }
};

export { getCommentsByPost, createComment };
