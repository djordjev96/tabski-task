"use strict";
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
const like_service_1 = require("@/services/like.service");
const user_mock_1 = require("./__mocks__/user.mock");
const post_mock_1 = require("./__mocks__/post.mock");
const like_mock_1 = require("./__mocks__/like.mock");
describe("LikeService", () => {
    let likeService;
    let likeRepository;
    let postRepository;
    let userRepository;
    beforeAll(() => {
        likeRepository = {};
        postRepository = {};
        userRepository = {};
        likeService = new like_service_1.LikeService(likeRepository, postRepository, userRepository);
    });
    describe("createLike", () => {
        it("should return created like if user and post are found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            postRepository.findOne = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            likeRepository.create = jest.fn().mockReturnValue({});
            likeRepository.save = jest.fn().mockReturnValue(like_mock_1.getLikeMock);
            const result = yield likeService.createLike(user_mock_1.userMock.id, post_mock_1.getPostMock.id);
            expect(result).toEqual(like_mock_1.getLikeMock);
            expect(likeRepository.create).toHaveBeenCalledWith({
                user: user_mock_1.userMock,
                post: post_mock_1.getPostMock,
            });
        }));
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            postRepository.findOne = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            expect(likeService.createLike("not-found-id", post_mock_1.getPostMock.id)).rejects.toThrow("User not found");
        }));
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(likeService.createLike(user_mock_1.userMock.id, user_mock_1.userMock.id)).rejects.toThrow("Post not found");
        }));
    });
    describe("getAllLikes", () => {
        it("should return all likes", () => __awaiter(void 0, void 0, void 0, function* () {
            likeRepository.find = jest.fn().mockReturnValue([like_mock_1.getLikeMock]);
            const result = yield likeService.getAllLikes();
            expect(result).toEqual([like_mock_1.getLikeMock]);
            expect(likeRepository.find).toHaveBeenCalledWith({});
        }));
    });
    describe("getLike", () => {
        it("should return like entity with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            likeRepository.findOne = jest.fn().mockReturnValue(like_mock_1.getLikeMock);
            const result = yield likeService.getLike(like_mock_1.getLikeMock.id);
            expect(result).toEqual(like_mock_1.getLikeMock);
            expect(likeRepository.findOne).toHaveBeenCalledWith({
                where: { id: like_mock_1.getLikeMock.id },
            });
        }));
        it("should throw an error if like is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            likeRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(likeService.getLike("not-found-id")).rejects.toThrow("Like not found");
        }));
    });
    describe("deletePost", () => {
        it("should throw an error if like is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            likeRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(likeService.deleteLike("not-found-id")).rejects.toThrow("Like not found");
        }));
        it("should delete like entity with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            likeRepository.findOne = jest.fn().mockReturnValue(like_mock_1.getLikeMock);
            likeRepository.remove = jest.fn().mockReturnValue(like_mock_1.getLikeMock);
            const result = yield likeService.deleteLike(like_mock_1.getLikeMock.id);
            expect(result).toEqual(like_mock_1.getLikeMock);
            expect(likeRepository.findOne).toBeCalledWith({
                where: { id: like_mock_1.getLikeMock.id },
            });
            expect(likeRepository.remove).toBeCalledWith(like_mock_1.getLikeMock);
        }));
    });
});
