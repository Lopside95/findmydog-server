import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
} from "../controllers/posts-controller.ts";
import {
  createComment,
  getCommentsByPost,
} from "../controllers/comments-controller.ts";
import authorize from "../middleware/auth.ts";

const router: Router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

router.get("/:id/comments", getCommentsByPost);

// router.post("/:id/comments", createComment);
router.post("/:id", authorize, createComment);

export default router;
