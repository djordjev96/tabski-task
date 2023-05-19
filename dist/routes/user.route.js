"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_controller_1 = require("@/controllers/user.controller");
const create_user_validator_1 = require("@/validators/create-user.validator");
const validator_middleware_1 = require("@/middlewares/validator.middleware");
const update_user_validator_1 = require("@/validators/update-user.validator.");
class UserRoute {
    constructor() {
        this.path = "users";
        this.controller = typeorm_typedi_extensions_1.Container.get(user_controller_1.UserController);
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/${this.path}`, (0, validator_middleware_1.validate)(create_user_validator_1.CreateUserValidator), this.controller.createUser);
        this.router.get(`/${this.path}`, this.controller.getAllUsers);
        this.router.get(`/${this.path}/:id`, this.controller.getUserById);
        this.router.patch(`/${this.path}/:id`, (0, validator_middleware_1.validate)(update_user_validator_1.UpdateUserValidator), this.controller.updateUser);
        this.router.delete(`/${this.path}/:id`, this.controller.deleteUser);
    }
}
exports.UserRoute = UserRoute;
