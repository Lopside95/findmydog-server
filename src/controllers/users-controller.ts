import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { UserSchema } from "../utils/types.ts";

const knex = initKnex(knexConfig);

const getAllTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: UserSchema = await knex("users");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

export { getAllTags };
