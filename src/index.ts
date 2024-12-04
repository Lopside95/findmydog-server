import express, { Express, Request, Response } from "express";
import "dotenv/config";
import posts from "./routes/posts.ts";
import users from "./routes/users.ts";
import tags from "./routes/tags.ts";
import home from "./routes/home.ts";
import cors from "cors";

const app: Express = express();

app.use(express.json());

app.use(cors());

app.use("/", home);

app.use("/posts", posts);
app.use("/users", users);
app.use("/tags", tags);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
