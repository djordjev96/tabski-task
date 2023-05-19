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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeService = void 0;
const like_entity_1 = require("@/entities/like.entity");
const post_entity_1 = require("@/entities/post.entity");
const user_entity_1 = require("@/entities/user.entity");
const http_exception_1 = require("@/exceptions/http.exception");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
let LikeService = class LikeService {
    constructor(likeRepo, postrepo, userRepo) {
        this.likeRepo = likeRepo;
        this.postrepo = postrepo;
        this.userRepo = userRepo;
    }
    createLike(userId, postId) {
        return __awaiter(this, void 0, void 0, function* () {
            const findUser = yield this.userRepo.findOne({ where: { id: userId } });
            const findPost = yield this.postrepo.findOne({ where: { id: postId } });
            if (!findUser || !findPost) {
                // todo
                throw new http_exception_1.HttpException(404, `${!findUser ? "User" : "Post"} not found`);
            }
            const createLike = this.likeRepo.create({ user: findUser, post: findPost });
            const _a = yield this.likeRepo.save(createLike), { post, user } = _a, like = __rest(_a, ["post", "user"]);
            return yield this.likeRepo.save(like);
        });
    }
    getAllLikes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.likeRepo.find({});
        });
    }
    getLike(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield this.likeRepo.findOne({
                where: { id },
            });
            if (!like) {
                throw new http_exception_1.HttpException(404, `Like not found`);
            }
            return like;
        });
    }
    deleteLike(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const like = yield this.likeRepo.findOne({ where: { id } });
            if (!like) {
                throw new http_exception_1.HttpException(404, `Like not found`);
            }
            return yield this.likeRepo.remove(like);
        });
    }
};
LikeService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typeorm_typedi_extensions_1.InjectRepository)(like_entity_1.Like)),
    __param(1, (0, typeorm_typedi_extensions_1.InjectRepository)(post_entity_1.Post)),
    __param(2, (0, typeorm_typedi_extensions_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Repository])
], LikeService);
exports.LikeService = LikeService;
