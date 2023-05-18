import { Router } from "express";
import { Container } from "typeorm-typedi-extensions";
import { UserController } from "@/controllers/user.controller";
import { CreateUserValidator } from "@/middlewares/create-user-validator.middleware";
import { validate } from "@/middlewares/validator.middleware";

export class UserRoute {
  private userController: UserController;
  public router: Router;
  path = "users";

  constructor() {
    this.userController = Container.get(UserController);
    this.router = Router();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post(
      `/${this.path}`,
      validate(CreateUserValidator),
      this.userController.createUser
    );
    this.router.get(`/${this.path}`, this.userController.getAllUsers);
    this.router.get(`/${this.path}/:id`, this.userController.getUserById);
    this.router.patch(`/${this.path}/:id`, this.userController.updateUser);
    this.router.delete(`/${this.path}/:id`, this.userController.deleteUser);
  }
}
