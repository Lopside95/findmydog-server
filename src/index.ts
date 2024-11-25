import express, { Express, Request, Response } from "express";
import "dotenv/config";
import posts from "./routes/posts.ts";

const app: Express = express();

app.use(express.json());

app.use("/posts", posts);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
