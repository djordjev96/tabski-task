"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const post_controller_1 = require("@/controllers/post.controller");
const express_1 = __importDefault(require("express"));
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const validator_middleware_1 = require("@/middlewares/validator.middleware");
const create_post_validator_1 = require("@/validators/create-post.validator");
const update_post_validator_1 = require("@/validators/update-post.validator");
class PostRoute {
    constructor() {
        this.path = "posts";
        this.controller = typeorm_typedi_extensions_1.Container.get(post_controller_1.PostController);
        this.router = express_1.default.Router();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`/${this.path}`, (0, validator_middleware_1.validate)(create_post_validator_1.CreatePostValidator), this.controller.createPost);
        this.router.get(`/${this.path}`, this.controller.getAllPosts);
        this.router.get(`/${this.path}/:id`, this.controller.getPostById);
        this.router.patch(`/${this.path}/:id`, (0, validator_middleware_1.validate)(update_post_validator_1.UpdatePostValidator), this.controller.updatePost);
        this.router.delete(`/${this.path}/:id`, this.controller.deletePost);
    }
}
exports.PostRoute = PostRoute;
