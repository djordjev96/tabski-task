import { PostController } from "@/controllers/post.controller";
import { Router } from "express";
import { Inject } from "typedi";
import express from "express";
import { Container } from "typeorm-typedi-extensions";

export class PostRoute {
  private postController: PostController;
  public router: Router;
  path = "post";

  constructor() {
    this.postController = Container.get(PostController);
    this.router = express.Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(`/${this.path}`, this.postController.createPost);
    this.router.get(`/${this.path}`, this.postController.getAllPosts);
    this.router.get(`/${this.path}/:id`, this.postController.getPostById);
    this.router.patch(`/${this.path}/:id`, this.postController.updatePost);
    this.router.delete(`/${this.path}/:id`, this.postController.deletePost);
  }
}
