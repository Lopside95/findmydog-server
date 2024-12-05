import { Router, Request, Response } from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  // getPostsWithTags,
} from "../controllers/posts-controller.ts";

const router: Router = Router();

router.get("/", getAllPosts);

router.get("/:id", getPostById);

router.post("/", createPost);

export default router;
