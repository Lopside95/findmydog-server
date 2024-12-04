import { Router, Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "../controllers/users-controller";

const router: Router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);

export default router;
