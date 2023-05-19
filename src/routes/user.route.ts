import { Router } from "express";
import { Container } from "typeorm-typedi-extensions";
import { UserController } from "@/controllers/user.controller";
import { CreateUserValidator } from "@/validators/create-user.validator";
import { validate } from "@/middlewares/validator.middleware";
import { UpdateUserValidator } from "@/validators/update-user.validator.";
import { Routes } from "@/interfaces/routes.interface";

export class UserRoute implements Routes {
  controller: UserController;
  router: Router;
  path = "users";

  constructor() {
    this.controller = Container.get(UserController);
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreateUserValidator),
      this.controller.createUser
    );
    this.router.get(`/${this.path}`, this.controller.getAllUsers);
    this.router.get(`/${this.path}/:id`, this.controller.getUserById);
    this.router.patch(
      `/${this.path}/:id`,
      validate(UpdateUserValidator),
      this.controller.updateUser
    );
    this.router.delete(`/${this.path}/:id`, this.controller.deleteUser);
  }
}
