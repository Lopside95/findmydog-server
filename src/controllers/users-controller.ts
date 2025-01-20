import { Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { User } from "../utils/types";
import { UserSchema } from "../utils/schemas";
import { JWTRequest } from "../middleware/auth";
import jwt from "jsonwebtoken";
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
const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;

    const user: User = await knex("users").where("id", id).first();

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

    try {
      const payload = req.body;
      const newUserIds: UserSchema[] = await knex("users").insert({
        first_name: payload.firstName,
        last_name: payload.lastName,
        email: payload.email,
        password: hashedPassword,
        active: true,
      });

      // add onscreen message for duplicate entry

      const newUser = await knex("users").where({ id: newUserIds[0] }).first();

      res.status(201).json(newUser);
    } catch (error: unknown) {
      res.status(500).json({ message: "Couldn't create user" + error });
      console.error(error);
    }
  });
};

const login = async (req: JWTRequest, res: Response) => {
  try {
    const user: User = await knex("users")
      .where({ email: req.body.email })
      .first();

    if (!user.password) {
      console.log("No password");
      return;
    }

    bcrypt.compare(req.body.password, user.password, function (err, success) {
      if (!success || err) {
        return res.status(403).json({
          message: "Email and password combination is invalid " + err,
        });
      }

      if (err) {
        return res.status(500).json({ message: "Error logging in" + err });
      }
      if (success) {
        const loginToken = jwt.sign(
          {
            id: user.id,
            sub: user.email,
          },

          process.env.JWT_SECRET as string
        );

        return res.status(200).json({ success: true, authToken: loginToken });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error logging in" + error,
    });
  }
};

const getAuthedUser = async (req: JWTRequest, res: Response) => {
  try {
    const user: User = await knex("users")
      .where({ id: req.body.token.id })
      .first();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error getting authed user " + error,
    });
  }
};

const updateUser = async (req: JWTRequest, res: Response): Promise<void> => {
  const user: User = await knex("users")
    .where({ email: req.body.email })
    .first();

  if (req.body.password) {
    bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Couldn't encrypt the supplied password" });
      }
      try {
        const payload = req.body;

        const userPayload: UserSchema = await knex("users")
          .where({ id: user.id })
          .update({
            first_name: payload.firstName,
            last_name: payload.lastName,
            email: payload.email,
            password: hashedPassword,
            active: true,
          });

        res.status(200).json(userPayload);
      } catch (error) {
        res.status(500).json({ message: "Couldn't create user" + error });
        console.error(error);
      }
    });
  }
};

const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.body.email) {
      res.status(400).json({ message: "Email is required" });
    }

    const user: User = await knex("users")
      .where({ email: req.body.email })
      .first();
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    await knex("users").where({ id: user.id }).del();
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting user" + error });
  }
};

export {
  getAllUsers,
  createUser,
  getUserById,
  login,
  getAuthedUser,
  updateUser,
  deleteUser,
};
