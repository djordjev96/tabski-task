import "reflect-metadata";
require("module-alias/register");
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { errorMiddleware } from "./middlewares/error.middleware";
import { Routes } from "./interfaces/routes.interface";
import cors from "cors";
import { UserRoute } from "./routes/user.route";
import { PostRoute } from "./routes/post.route";
import { LikeRoute } from "./routes/like.route";
import morgan from "morgan";

export default class App {
  public app: express.Application;
  public port: string | number;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || 3000;

    this.initialize();
  }

  async initialize() {
    this.initializeMiddlewares();
    await this.initializeDatabase();
    this.initializeRoutes([new UserRoute(), new PostRoute(), new LikeRoute()]);
    this.initializeErrorHandling();
  }

  initializeMiddlewares() {
    dotenv.config();
    this.app.use(morgan("tiny"));
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  async initializeDatabase() {
    useContainer(Container);
    try {
      await createConnection({
        type: "postgres",
        database: process.env.PGDATABASE,
        host: process.env.PGHOST,
        username: process.env.PGUSER,
        password: process.env.PGPASSWORD,
        port: +(process.env.PGPORT || 5432),
        synchronize: true,
        entities: ["dist/**/*.entity.js"],
      });
      console.log("Connected to database");
    } catch (err) {
      console.error(`Couldn't connect to the database`);
      console.error(err);
    }
  }

  initializeRoutes(routes: Routes[]) {
    routes.forEach((route) => {
      this.app.use("/", route.router);
    });
  }

  initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(
        `[server]: Server is running at http://localhost:${this.port}`
      );
    });
  }
}
