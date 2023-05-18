"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_controller_1 = require("@/controllers/user.controller");
const create_user_validator_middleware_1 = require("@/middlewares/create-user-validator.middleware");
const validator_middleware_1 = require("@/middlewares/validator.middleware");
class UserRoute {
    constructor() {
        this.path = "users";
        this.userController = typeorm_typedi_extensions_1.Container.get(user_controller_1.UserController);
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/${this.path}`, (0, validator_middleware_1.validate)(create_user_validator_middleware_1.CreateUserValidator), this.userController.createUser);
        this.router.get(`/${this.path}`, this.userController.getAllUsers);
        this.router.get(`/${this.path}/:id`, this.userController.getUserById);
        this.router.patch(`/${this.path}/:id`, this.userController.updateUser);
        this.router.delete(`/${this.path}/:id`, this.userController.deleteUser);
    }
}
exports.UserRoute = UserRoute;
