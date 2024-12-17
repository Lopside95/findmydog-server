import { Router } from "express";
import { getAllTags } from "../controllers/tags-controller";

const router: Router = Router();

router.get("/", getAllTags);

export default router;
