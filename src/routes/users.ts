import { Router, Request, Response } from "express";
import { createUser, getAllUsers } from "../controllers/users-controller";

const router: Router = Router();

router.post("/", createUser);
router.get("/", getAllUsers);

export default router;
