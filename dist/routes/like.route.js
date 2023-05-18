"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeRoute = void 0;
const express_1 = require("express");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const validator_middleware_1 = require("@/middlewares/validator.middleware");
const like_controller_1 = require("@/controllers/like.controller");
const create_like_validator_middleware_1 = require("@/middlewares/create-like-validator.middleware");
class LikeRoute {
    constructor() {
        this.path = "likes";
        this.likeController = typeorm_typedi_extensions_1.Container.get(like_controller_1.LikeController);
        this.router = (0, express_1.Router)();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/${this.path}`, (0, validator_middleware_1.validate)(create_like_validator_middleware_1.CreateLikeValidator), this.likeController.createLike);
        this.router.get(`/${this.path}`, this.likeController.getAllLikes);
        this.router.get(`/${this.path}/:id`, this.likeController.getLikeById);
        this.router.delete(`/${this.path}/:id`, this.likeController.deleteLike);
    }
}
exports.LikeRoute = LikeRoute;
