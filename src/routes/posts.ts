import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
} from "../controllers/posts-controller.ts";
import { getCommentsByPost } from "../controllers/comments-controller.ts";

const router: Router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

router.get("/:id/comments", getCommentsByPost);

export default router;
