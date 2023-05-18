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
const saveMock = {
    id: "e8c474dc-db7b-4198-90b6-24b64044413e",
    name: "AuthorName",
    email: "test@test.com",
    createdAt: "2023-05-18T09:11:06.675Z",
    updatedAt: "2023-05-18T09:11:23.253Z",
    password: "3219dno1u3n2i1jdni1o1",
};
const userMock = {
    id: "e8c474dc-db7b-4198-90b6-24b64044413e",
    name: "AuthorName",
    email: "test@test.com",
    createdAt: "2023-05-18T09:11:06.675Z",
    updatedAt: "2023-05-18T09:11:23.253Z",
};
const savePostMock = {
    title: "Title",
    content: "Content",
    author: {
        id: "e8c474dc-db7b-4198-90b6-24b64044413e",
        name: "name2a",
        email: "sjajdajaaaas@hdashasd.com",
        createdAt: "2023-05-18T09:11:06.675Z",
        updatedAt: "2023-05-18T09:11:23.253Z",
    },
    id: "abfdfb15-760a-4275-abe6-80c5cd0e5809",
    createdAt: "2023-05-18T11:57:49.045Z",
    updatedAt: "2023-05-18T11:57:49.045Z",
};
const getPostMock = {
    id: "abfdfb15-760a-4275-abe6-80c5cd0e5809",
    title: "Title",
    content: "Content",
    createdAt: "2023-05-18T11:57:49.045Z",
    updatedAt: "2023-05-18T11:57:49.045Z",
};
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
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            postRepository.create = jest.fn().mockReturnValue({});
            postRepository.save = jest.fn().mockReturnValue(savePostMock);
            const result = yield postService.createPost(savePostMock.title, savePostMock.content, savePostMock.author.id);
            expect(result).toEqual(savePostMock);
            expect(postRepository.create).toHaveBeenCalledWith({
                title: saveMock.name,
                content: saveMock.email,
                author: userMock,
            });
        }));
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.createPost(savePostMock.title, savePostMock.content, "not-found-id")).rejects.toThrow("User not found");
        }));
    });
    describe("getAllPosts", () => {
        it("should return all posts", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.find = jest.fn().mockReturnValue([getPostMock]);
            const result = yield postService.getAllPosts();
            expect(result).toEqual([getPostMock]);
            expect(postRepository.find).toHaveBeenCalledWith({});
        }));
    });
    describe("getPost", () => {
        it("should return post with specified id", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
            const result = yield postService.getPost(getPostMock.id);
            expect(result).toEqual(getPostMock);
            expect(postRepository.findOne).toHaveBeenCalledWith({
                where: { id: getPostMock.id },
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
            postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
            postRepository.save = jest
                .fn()
                .mockReturnValue(Object.assign(Object.assign({}, getPostMock), updatedFields));
            const result = yield postService.updatePost(getPostMock.id, updatedFields);
            expect(result).toEqual(Object.assign(Object.assign({}, getPostMock), updatedFields));
            expect(postRepository.findOne).toBeCalledWith({
                where: { id: getPostMock.id },
            });
        }));
    });
    describe("deletePost", () => {
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(postService.deletePost("not-found-id")).rejects.toThrow("Post not found");
        }));
        it("should delete post with specified id and return that post", () => __awaiter(void 0, void 0, void 0, function* () {
            postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
            postRepository.remove = jest.fn().mockReturnValue(getPostMock);
            const result = yield postService.deletePost(getPostMock.id);
            expect(result).toEqual(getPostMock);
            expect(postRepository.findOne).toBeCalledWith({
                where: { id: getPostMock.id },
            });
            expect(postRepository.remove).toBeCalledWith(getPostMock);
        }));
    });
});
