import { UserService } from "@/services/user.service";
import { NextFunction, Request, Response } from "express";
import Container, { Inject, Service } from "typedi";

@Service()
export class UserController {
  constructor(@Inject() private userService: UserService) {}

  createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.createUser(
        req.body.name,
        req.body.email,
        req.body.password
      );

      res.status(201).send(user);
    } catch (err) {
      next(err);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUsers();

      res.status(200).send(users);
    } catch (err) {
      next(err);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.getUser(req.params.id);

      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  };

  updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.updateUser(req.params.id, req.body);

      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  };

  deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.userService.deleteUser(req.params.id);

      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  };
}
