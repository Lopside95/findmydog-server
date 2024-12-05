import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile.ts";
import { User } from "../utils/types.ts";
import { UserSchema } from "../utils/schemas.ts";
import { JWTRequest } from "../middleware/auth.ts";
import { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

const knex = initKnex(knexConfig);

const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await knex("users");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
  }
};
const getUserById = async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    // const id = req.params.id;
    const token = req.token as JwtPayload;

    const user: User = await knex("users").where({ id: token.id }).first();
    // const user: User = await knex("users").where("id", id).first();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "There was an error fetching the user profile" });
  }
};

const createUser = async (req: Request, res: Response): Promise<void> => {
  bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hashedPassword) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Couldn't encrypt the supplied password" });
    }

    // const hashedPass = bcrypt.hash(req.body.password, SALT_ROUNDS)

    try {
      const payload = req.body;

      const newUserIds: UserSchema[] = await knex("users").insert({
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        password: hashedPassword,
        active: true,
      });

      res.status(201).json(newUserIds[0]);
    } catch (error) {
      res.status(500).json({ message: "Couldn't create user" + error });
      console.error(error);
    }
  });
};
export { getAllUsers, createUser, getUserById };
