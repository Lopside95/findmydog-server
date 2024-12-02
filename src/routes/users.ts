import { Router, Request, Response } from "express";
import { getAllUsers } from "../controllers/users-controller";

const router: Router = Router();

router.get("/", getAllUsers);

// router.get("/", (req: Request, res: Response) => {
//   res.send("This is coming from the users route");
// });

export default router;
