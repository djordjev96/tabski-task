"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLikeValidator = void 0;
const joi_1 = __importDefault(require("joi"));
exports.CreateLikeValidator = joi_1.default.object({
    authorId: joi_1.default.string().required(),
    postId: joi_1.default.string().required(),
});
