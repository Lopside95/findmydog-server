import { Router, Request, Response } from "express";
import { getAllPosts } from "../controllers/posts-controller.ts";

const router: Router = Router();

// router.get("/", (req: Request, res: Response) => {
//   res.send("This is coming from the posts route");
// });

router.get("/", getAllPosts);

export default router;
