import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";

const knex = initKnex(knexConfig);

const getAllPosts = async (req: Request, res: Response): Promise<void> => {
  try {
    const posts = await knex("posts");

    res.json(posts);
  } catch (error) {
    console.error(error);
  }
};

export { getAllPosts };
