import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";
import { User } from "./entities/user.entity";
import { Post } from "./entities/post.entity";

dotenv.config();

const app: Express = express();
const port = 3000;

useContainer(Container);
createConnection({
  type: "postgres",
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  port: +(process.env.PGPORT || 5432),
  // port: process.env.PGPORT,
  synchronize: true,
  entities: [User, Post],
}).catch((err) => {
  console.error(`Couldn't connect to the database`);
  console.error(err);
});

app.get("/", (req: Request, res: Response) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
