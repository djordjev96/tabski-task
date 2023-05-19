import { Router } from "express";
import { Container } from "typeorm-typedi-extensions";
import { validate } from "@/middlewares/validator.middleware";
import { LikeController } from "@/controllers/like.controller";
import { CreateLikeValidator } from "@/validators/create-like.validator";
import { Routes } from "@/interfaces/routes.interface";

export class LikeRoute implements Routes {
  controller: LikeController;
  router: Router;
  path = "likes";

  constructor() {
    this.controller = Container.get(LikeController);
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreateLikeValidator),
      this.controller.createLike
    );
    this.router.get(`/${this.path}`, this.controller.getAllLikes);
    this.router.get(`/${this.path}/:id`, this.controller.getLikeById);
    this.router.delete(`/${this.path}/:id`, this.controller.deleteLike);
  }
}
