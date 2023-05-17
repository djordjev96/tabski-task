"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const post_service_1 = require("@/services/post.service");
const typedi_1 = require("typedi");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
        this.createPost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postService.createPost(req.body.title, req.body.content, req.body.authorId);
                res.status(201).send(post);
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllPosts = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield this.postService.getAllPosts();
                res.status(200).send(posts);
            }
            catch (err) {
                next(err);
            }
        });
        this.getPostById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postService.getPost(req.params.id);
                res.status(200).send(post);
            }
            catch (err) {
                next(err);
            }
        });
        this.updatePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postService.patchPost(req.params.id, req.body);
                res.status(200).send(post);
            }
            catch (err) {
                next(err);
            }
        });
        this.deletePost = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postService.deletePost(req.params.id);
                res.status(200).send(post);
            }
            catch (err) {
                next(err);
            }
        });
    }
};
PostController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
exports.PostController = PostController;
