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
const saveLikeMock = {
    user: {
        id: "021122ac-84ef-4533-9796-eb5f18d8846b",
        name: "User",
        email: "email2@email.com",
        createdAt: "2023-05-18T12:22:34.666Z",
        updatedAt: "2023-05-18T12:22:34.666Z",
    },
    post: {
        id: "6fc0ecc0-a856-4257-92a8-d6fcea9a34f2",
        title: "Title",
        content: "Content",
        createdAt: "2023-05-18T12:20:56.893Z",
        updatedAt: "2023-05-18T12:20:56.893Z",
    },
    id: "a11f63c0-7fe8-4e41-81d8-9d5ef4301586",
    createdAt: "2023-05-18T12:23:14.091Z",
    updatedAt: "2023-05-18T12:23:14.091Z",
};
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
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
            postRepository.create = jest.fn().mockReturnValue({});
            postRepository.save = jest.fn().mockReturnValue(saveLikeMock);
            const result = yield likeService.createLike(userMock.id, getPostMock.id);
            expect(result).toEqual(saveLikeMock);
            expect(likeRepository.create).toHaveBeenCalledWith({
                authorId: userMock.id,
                postId: getPostMock.id,
            });
        }));
        it("should throw an error if user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(undefined);
            postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
            expect(likeService.createLike("not-found-id", getPostMock.id)).rejects.toThrow("User not found");
        }));
        it("should throw an error if post is not found", () => __awaiter(void 0, void 0, void 0, function* () {
            userRepository.findOne = jest.fn().mockReturnValue(userMock);
            postRepository.findOne = jest.fn().mockReturnValue(undefined);
            expect(likeService.createLike(userMock.id, userMock.id)).rejects.toThrow("Post not found");
        }));
    });
    //   describe("getAllLikes", () => {
    //     it("should return all likes", async () => {
    //       likeRepository.find = jest.fn().mockReturnValue([getPostMock]);
    //       const result = await postService.getAllPosts();
    //       expect(result).toEqual([getPostMock]);
    //       expect(postRepository.find).toHaveBeenCalledWith({});
    //     });
    //   });
    //   describe("getPost", () => {
    //     it("should return post with specified id", async () => {
    //       postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
    //       const result = await postService.getPost(getPostMock.id);
    //       expect(result).toEqual(getPostMock);
    //       expect(postRepository.findOne).toHaveBeenCalledWith({
    //         where: { id: getPostMock.id },
    //       });
    //     });
    //     it("should throw an error if post is not found", async () => {
    //       postRepository.findOne = jest.fn().mockReturnValue(undefined);
    //       expect(postService.getPost("not-found-id")).rejects.toThrow(
    //         "Post not found"
    //       );
    //     });
    //   });
    //   describe("updatePost", () => {
    //     it("should throw an error if post is not found", async () => {
    //       postRepository.findOne = jest.fn().mockReturnValue(undefined);
    //       expect(
    //         postService.updatePost("not-found-id", { title: "Title2" })
    //       ).rejects.toThrow("Post not found");
    //     });
    //     it("should update the post with specified id", async () => {
    //       const updatedFields = { title: "UpdatedTitle" };
    //       postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
    //       postRepository.save = jest
    //         .fn()
    //         .mockReturnValue({ ...getPostMock, ...updatedFields });
    //       const result = await postService.updatePost(
    //         getPostMock.id,
    //         updatedFields
    //       );
    //       expect(result).toEqual({ ...getPostMock, ...updatedFields });
    //       expect(postRepository.findOne).toBeCalledWith({
    //         where: { id: getPostMock.id },
    //       });
    //     });
    //   });
    //   describe("deletePost", () => {
    //     it("should throw an error if post is not found", async () => {
    //       postRepository.findOne = jest.fn().mockReturnValue(undefined);
    //       expect(postService.deletePost("not-found-id")).rejects.toThrow(
    //         "Post not found"
    //       );
    //     });
    //     it("should delete post with specified id and return that post", async () => {
    //       postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
    //       postRepository.remove = jest.fn().mockReturnValue(getPostMock);
    //       const result = await postService.deletePost(getPostMock.id);
    //       expect(result).toEqual(getPostMock);
    //       expect(postRepository.findOne).toBeCalledWith({
    //         where: { id: getPostMock.id },
    //       });
    //       expect(postRepository.remove).toBeCalledWith(getPostMock);
    //     });
    //   });
});
