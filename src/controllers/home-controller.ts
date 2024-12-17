import { Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";

const knex = initKnex(knexConfig);

const getHomePage = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({ message: "this is coming from the home page" });
  } catch (error) {
    console.error(error);
  }
};

export { getHomePage };
