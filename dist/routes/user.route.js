"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoute = void 0;
const express_1 = require("express");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const user_controller_1 = require("@/controllers/user.controller");
class UserRoute {
    constructor() {
        this.path = "user";
        this.userController = typeorm_typedi_extensions_1.Container.get(user_controller_1.UserController);
        this.router = (0, express_1.Router)();
        console.log("hej");
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get("/haha", (req, res) => {
            res.status(200).send("lol");
        });
        this.router.post(`/${this.path}`, this.userController.createUser);
        this.router.get(`/${this.path}`, this.userController.getAllUsers);
        this.router.get(`/${this.path}/:id`, this.userController.getUserById);
        this.router.patch(`/${this.path}/:id`, this.userController.updateUser);
        this.router.delete(`/${this.path}/:id`, this.userController.deleteUser);
    }
}
exports.UserRoute = UserRoute;
