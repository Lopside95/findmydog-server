import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { TagSchema } from "../utils/schemas";

const knex = initKnex(knexConfig);

const getAllTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const tags: TagSchema[] = await knex("tags");

    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
  }
};

export { getAllTags };
