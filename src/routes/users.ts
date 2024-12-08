import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getAuthedUser,
  getUserById,
  login,
} from "../controllers/users-controller";
import authorize from "../middleware/auth";

const router: Router = Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", login);
router.get("/account", authorize, getAuthedUser);

export default router;
