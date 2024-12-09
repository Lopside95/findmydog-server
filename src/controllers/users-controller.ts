import { Router, Request, Response } from "express";
import initKnex from "knex";
import knexConfig from "../../knexfile";
import { User } from "../utils/types";
import { UserSchema } from "../utils/schemas";
import { JWTRequest } from "../middleware/auth";
import jwt, { JwtPayload } from "jsonwebtoken";
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

      res.status(201).json(newUserIds[0]);
    } catch (error) {
      res.status(500).json({ message: "Couldn't create user" + error });
      console.error(error);
    }
  });
};

const login = async (req: JWTRequest, res: Response): Promise<void> => {
  try {
    // const id = req.params.id;
    // const token = req.token as JwtPayload;
    const password = req.body.password;
    const user: User = await knex("users")
      .where({ email: req.body.email })
      .first();

    if (!user.password) {
      res.status(404).json({ message: "Couldn't find user password" });
      return;
    }

    bcrypt.compare(password, user.password, function (_, success) {
      if (!success) {
        return res
          .status(403)
          .json({ message: "Email and password combination is invalid" });
      }
    });

    const loginToken = jwt.sign(
      {
        id: user.id,
        sub: user.email,
      },

      process.env.JWT_SECRET as string
    );

    res.status(200).json({ authToken: loginToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error logging in" + error,
    });
  }
};

const getAuthedUser = async (req: JWTRequest, res: Response): Promise<void> => {
  const token = req.token as JwtPayload;

  try {
    const user: User = await knex("users")
      .where({ id: req.body.token.id })
      .first();

    res.status(200).json(user);
    delete user.password;
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "There was an error getting authed user " + error,
    });
  }
};

const updateUser = async (req: JWTRequest, res: Response): Promise<void> => {
  if (req.body.password) {
    bcrypt.hash(req.body.password, SALT_ROUNDS, async (err, hashedPassword) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Couldn't encrypt the supplied password" });
      }

      try {
        const payload = req.body;

        const updatedUser: UserSchema = await knex("users").update({
          first_name: payload.firstName,
          last_name: payload.lastName,
          email: payload.email,
          password: hashedPassword,
          active: true,
        });
      } catch (error) {
        res.status(500).json({ message: "Couldn't create user" + error });
        console.error(error);
      }
    });
  }

  return console.log("updatre");
};

export {
  getAllUsers,
  createUser,
  getUserById,
  login,
  getAuthedUser,
  updateUser,
};
