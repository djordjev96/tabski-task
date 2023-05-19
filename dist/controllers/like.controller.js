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
exports.LikeController = void 0;
const like_service_1 = require("@/services/like.service");
const typedi_1 = require("typedi");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
        this.createLike = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield this.likeService.createLike(req.body.userId, req.body.postId);
                res.status(201).send(like);
            }
            catch (err) {
                next(err);
            }
        });
        this.getAllLikes = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const likes = yield this.likeService.getAllLikes();
                res.status(200).send(likes);
            }
            catch (err) {
                next(err);
            }
        });
        this.getLikeById = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield this.likeService.getLike(req.params.id);
                res.status(200).send(like);
            }
            catch (err) {
                next(err);
            }
        });
        this.deleteLike = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const like = yield this.likeService.deleteLike(req.params.id);
                res.status(200).send(like);
            }
            catch (err) {
                next(err);
            }
        });
    }
};
LikeController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)()),
    __metadata("design:paramtypes", [like_service_1.LikeService])
], LikeController);
exports.LikeController = LikeController;
