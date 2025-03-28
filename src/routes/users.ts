import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getAuthedUser,
  signin,
  updateUser,
} from "../controllers/users-controller";
import authorize from "../middleware/auth";

const router: Router = Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/signin", signin);
router.get("/account", authorize, getAuthedUser);
router.put("/account", authorize, updateUser);
router.delete("/account", deleteUser);

export default router;
