import "reflect-metadata";
require("module-alias/register");
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { UserRoute } from "./routes/user.route";
import { PostRoute } from "./routes/post.route";
import { LikeRoute } from "./routes/like.route";
import { errorMiddleware } from "./middlewares/error.middleware";

dotenv.config();

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 3000;

useContainer(Container);
createConnection({
  type: "postgres",
  database: process.env.PGDATABASE,
  host: "172.17.0.2",
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: +(process.env.PGPORT || 5432),
  synchronize: true,
  entities: ["dist/**/*.entity.js"],
})
  .then(() => {
    const userRoute = new UserRoute();
    const postRoute = new PostRoute();
    const likeRoute = new LikeRoute();

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello");
    });

    app.use("/", userRoute.router);
    app.use("/", postRoute.router);
    app.use("/", likeRoute.router);

    //error handling
    app.use(errorMiddleware);
  })
  .catch((err) => {
    console.error(`Couldn't connect to the database`);
    console.error(err);
  });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
