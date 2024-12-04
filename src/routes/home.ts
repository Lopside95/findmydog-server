import { Router, Request, Response } from "express";
import { getHomePage } from "../controllers/home-controller";

const router: Router = Router();

router.get("/", getHomePage);

export default router;
