import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { User } from "../utils/types.ts";
import { UserSchema } from "../utils/schemas.ts";

const knex = initKnex(knexConfig);

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await knex("users");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const payload = req.body;

    const newUserIds: UserSchema[] = await knex("users").insert({
      first_name: payload.firstName,
      last_name: payload.lastName,
      email: payload.email,
      password: payload.password,
      active: true,
    });

    res.status(201).json(newUserIds[0]);
  } catch (error) {
    console.error(error);
  }
};
export { getAllUsers, createUser };
