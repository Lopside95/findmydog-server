import express, { Express, Request, Response, Router } from "express";
import "dotenv/config";
import posts from "./routes/posts";
import users from "./routes/users";
import tags from "./routes/tags";
import home from "./routes/home";
import cors from "cors";

const router: Router = Router();

const app: Express = express();

app.use(express.json());

app.use(express.static("public"));

app.use(cors());

app.use("/", home);
app.use("/posts", posts);
app.use("/users", users);
app.use("/tags", tags);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
