import { Router } from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getAuthedUser,
  login,
  updateUser,
} from "../controllers/users-controller";
import authorize from "../middleware/auth";

const router: Router = Router();

router.get("/", getAllUsers);
router.post("/signup", createUser);
router.post("/login", login);
router.get("/account", authorize, getAuthedUser);
router.put("/account", authorize, updateUser);
router.delete("/account", deleteUser);

export default router;
