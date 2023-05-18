import { PostController } from "@/controllers/post.controller";
import { Router } from "express";
import { Inject } from "typedi";
import express from "express";
import { Container } from "typeorm-typedi-extensions";
import { validate } from "@/middlewares/validator.middleware";
import { CreatePostValidator } from "@/middlewares/create-post-validator.middleware";
import { UpdatePostValidator } from "@/middlewares/update-post-validator.middleware";

export class PostRoute {
  private postController: PostController;
  public router: Router;
  path = "posts";

  constructor() {
    this.postController = Container.get(PostController);
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreatePostValidator),
      this.postController.createPost
    );
    this.router.get(`/${this.path}`, this.postController.getAllPosts);
    this.router.get(`/${this.path}/:id`, this.postController.getPostById);
    this.router.patch(
      `/${this.path}/:id`,
      validate(UpdatePostValidator),
      this.postController.updatePost
    );
    this.router.delete(`/${this.path}/:id`, this.postController.deletePost);
  }
}
