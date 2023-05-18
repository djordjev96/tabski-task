import { Router } from "express";
import { Container } from "typeorm-typedi-extensions";
import { validate } from "@/middlewares/validator.middleware";
import { LikeController } from "@/controllers/like.controller";
import { CreateLikeValidator } from "@/middlewares/create-like-validator.middleware";

export class LikeRoute {
  private likeController: LikeController;
  public router: Router;
  path = "likes";

  constructor() {
    this.likeController = Container.get(LikeController);
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreateLikeValidator),
      this.likeController.createLike
    );
    this.router.get(`/${this.path}`, this.likeController.getAllLikes);
    this.router.get(`/${this.path}/:id`, this.likeController.getLikeById);
    this.router.delete(`/${this.path}/:id`, this.likeController.deleteLike);
  }
}
