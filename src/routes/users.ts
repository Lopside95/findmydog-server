import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users-controller";
import authorize from "../middleware/auth";

const router: Router = Router();

router.post("/signup", createUser);
router.get("/", getAllUsers);
router.get("/:id", authorize, getUserById);

export default router;
