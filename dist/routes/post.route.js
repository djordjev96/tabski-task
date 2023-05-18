"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const post_controller_1 = require("@/controllers/post.controller");
const express_1 = __importDefault(require("express"));
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
class PostRoute {
    constructor() {
        this.path = "posts";
        this.postController = typeorm_typedi_extensions_1.Container.get(post_controller_1.PostController);
        this.router = express_1.default.Router();
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
exports.PostRoute = PostRoute;
