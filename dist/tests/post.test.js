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
const post_service_1 = require("@/services/post.service");
const user_mock_1 = require("./__mocks__/user.mock");
const post_mock_1 = require("./__mocks__/post.mock");
describe("PostService", () => {
    let postService;
    let postRepository;
    let userRepository;
    beforeAll(() => {
        postRepository = {};
        userRepository = {};
        postService = new post_service_1.PostService(postRepository, userRepository);
    });
    describe("createPost", () => {
        it("should return created post if user is found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(user_mock_1.userMock);
            postRepository.create = jest.fn().mockReturnValue({});
            postRepository.save = jest.fn().mockReturnValue(post_mock_1.savePostMock);
            const result = yield postService.createPost(post_mock_1.savePostMock.title, post_mock_1.savePostMock.content, post_mock_1.savePostMock.author.id);
            expect(result).toEqual(post_mock_1.savePostMock);
            expect(postRepository.create).toHaveBeenCalledWith({
                title: post_mock_1.savePostMock.title,
                content: post_mock_1.savePostMock.content,
                author: user_mock_1.userMock,
            });
        }));
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.createPost(post_mock_1.savePostMock.title, post_mock_1.savePostMock.content, "not-found-id")).rejects.toThrow("User not found");
        }));
    });
    describe("getAllPosts", () => {
        it("should return all posts", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.find = jest.fn().mockReturnValue([post_mock_1.getPostMock]);
            const result = yield postService.getAllPosts();
            expect(result).toEqual([post_mock_1.getPostMock]);
            expect(postRepository.find).toHaveBeenCalledWith({});
        }));
    });
    describe("getPost", () => {
        it("should return post with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            const result = yield postService.getPost(post_mock_1.getPostMock.id);
            expect(result).toEqual(post_mock_1.getPostMock);
            expect(postRepository.findOne).toHaveBeenCalledWith({
                where: { id: post_mock_1.getPostMock.id },
            });
        }));
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.getPost("not-found-id")).rejects.toThrow("Post not found");
        }));
    });
    describe("updatePost", () => {
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.updatePost("not-found-id", { title: "Title2" })).rejects.toThrow("Post not found");
        }));
        it("should update the post with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            const updatedFields = { title: "UpdatedTitle" };
            postRepository.findOne = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            postRepository.save = jest
                .fn()
                .mockReturnValue(Object.assign(Object.assign({}, post_mock_1.getPostMock), updatedFields));
            const result = yield postService.updatePost(post_mock_1.getPostMock.id, updatedFields);
            expect(result).toEqual(Object.assign(Object.assign({}, post_mock_1.getPostMock), updatedFields));
            expect(postRepository.findOne).toBeCalledWith({
                where: { id: post_mock_1.getPostMock.id },
            });
        }));
    });
    describe("deletePost", () => {
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.deletePost("not-found-id")).rejects.toThrow("Post not found");
        }));
        it("should delete post with specified id and return that post", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            postRepository.remove = jest.fn().mockReturnValue(post_mock_1.getPostMock);
            const result = yield postService.deletePost(post_mock_1.getPostMock.id);
            expect(result).toEqual(post_mock_1.getPostMock);
            expect(postRepository.findOne).toBeCalledWith({
                where: { id: post_mock_1.getPostMock.id },
            });
            expect(postRepository.remove).toBeCalledWith(post_mock_1.getPostMock);
        }));
    });
});
