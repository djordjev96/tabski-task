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
exports.PostService = void 0;
const post_entity_1 = require("@/entities/post.entity");
const user_entity_1 = require("@/entities/user.entity");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let PostService = class PostService {
    constructor(repo, userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }
    createPost(title, content, authorId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepo.findOne({ where: { id: authorId } });
            if (!user) {
                throw new Error("User not found");
            }
            const post = this.repo.create({ title, content, author: user });
            return yield this.repo.save(post);
        });
    }
    getAllPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repo.find({});
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.repo.findOne({ where: { id } });
            if (!post) {
                // make new error
                throw new Error("Post not found");
            }
            return post;
        });
    }
    updatePost(id, updatedColumns) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.repo.findOne({ where: { id } });
            if (!post) {
                // make new error
                throw new Error("Post not found");
            }
            Object.assign(post, updatedColumns);
            return yield this.repo.save(post);
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const post = yield this.repo.findOne({ where: { id } });
            if (!post) {
                // make new error
                throw new Error("Post not found");
            }
            return yield this.repo.remove(post);
        });
    }
};
PostService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typeorm_typedi_extensions_1.InjectRepository)(post_entity_1.Post)),
    __param(1, (0, typeorm_typedi_extensions_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository])
], PostService);
exports.PostService = PostService;
