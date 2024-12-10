import express, { Express, Request, Response, Router } from "express";
import "dotenv/config";
import posts from "./routes/posts";
import users from "./routes/users";
import tags from "./routes/tags";
import home from "./routes/home";
import cors from "cors";
import multer from "multer";

const router: Router = Router();

const app: Express = express();

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

app.use("/", home);
app.use("/posts", posts);
app.use("/users", users);
app.use("/tags", tags);

// router.get("/images", getMyPhotos);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});

// const upload = multer({
//   storage: multer.diskStorage({
//     destination: "./public/images",
//   }),
//   // storage: multer.memoryStorage(),
//   // dest: "./images",
//   limits: {
//     fileSize: 5000000,
//   },
// }).single("img");

// router.post("/images", upload, (req: Request, res: Response) => {
//   if (!req.file) {
//     console.log("no file");

//     res.status(400).json({ message: "no file uploaded" });
//     return;
//     // return res.status(400).json({message: "no file uploaded"})
//   }
//   try {
//     res.status(201).json({
//       message: "File uploaded successfully",
//       file: req.file, // Contains file metadata, including path, original name, etc.
//     });
//   } catch (error) {
//     console.error(error);
//   }
// });
