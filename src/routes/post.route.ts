import { PostController } from "@/controllers/post.controller";
import { Router } from "express";
import { Inject } from "typedi";
import express from "express";
import { Container } from "typeorm-typedi-extensions";
import { validate } from "@/middlewares/validator.middleware";
import { CreatePostValidator } from "@/validators/create-post.validator";
import { UpdatePostValidator } from "@/validators/update-post.validator";
import { Routes } from "@/interfaces/routes.interface";

export class PostRoute implements Routes {
  controller: PostController;
  router: Router;
  path = "posts";

  constructor() {
    this.controller = Container.get(PostController);
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreatePostValidator),
      this.controller.createPost
    );
    this.router.get(`/${this.path}`, this.controller.getAllPosts);
    this.router.get(`/${this.path}/:id`, this.controller.getPostById);
    this.router.patch(
      `/${this.path}/:id`,
      validate(UpdatePostValidator),
      this.controller.updatePost
    );
    this.router.delete(`/${this.path}/:id`, this.controller.deletePost);
  }
}
