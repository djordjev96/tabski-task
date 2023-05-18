import { User } from "@/entities/user.entity";
import { Repository } from "typeorm";
import { PostService } from "@/services/post.service";
import { Post } from "@/entities/post.entity";
import { LikeService } from "@/services/like.service";
import { Like } from "@/entities/like.entity";
import { userMock } from "./__mocks__/user.mock";
import { getPostMock } from "./__mocks__/post.mock";
import { saveLikeMock, getLikeMock } from "./__mocks__/like.mock";

describe("LikeService", () => {
  let likeService: LikeService;
  let likeRepository: Repository<Like>;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  beforeAll(() => {
    likeRepository = {} as Repository<Like>;
    postRepository = {} as Repository<Post>;
    userRepository = {} as Repository<User>;
    likeService = new LikeService(
      likeRepository,
      postRepository,
      userRepository
    );
  });

  describe("createLike", () => {
    it("should return created like if user and post are found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
      likeRepository.create = jest.fn().mockReturnValue({});
      likeRepository.save = jest.fn().mockReturnValue(saveLikeMock);

      const result = await likeService.createLike(userMock.id, getPostMock.id);

      expect(result).toEqual(saveLikeMock);
      expect(likeRepository.create).toHaveBeenCalledWith({
        user: userMock,
        post: getPostMock,
      });
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(undefined);
      postRepository.findOne = jest.fn().mockReturnValue(getPostMock);

      expect(
        likeService.createLike("not-found-id", getPostMock.id)
      ).rejects.toThrow("User not found");
    });

    it("should throw an error if post is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      postRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(likeService.createLike(userMock.id, userMock.id)).rejects.toThrow(
        "Post not found"
      );
    });
  });

  describe("getAllLikes", () => {
    it("should return all likes", async () => {
      likeRepository.find = jest.fn().mockReturnValue([getLikeMock]);

      const result = await likeService.getAllLikes();

      expect(result).toEqual([getLikeMock]);
      expect(likeRepository.find).toHaveBeenCalledWith({});
    });
  });

  describe("getLike", () => {
    it("should return like entity with specified id", async () => {
      likeRepository.findOne = jest.fn().mockReturnValue(getLikeMock);

      const result = await likeService.getLike(getLikeMock.id);

      expect(result).toEqual(getLikeMock);
      expect(likeRepository.findOne).toHaveBeenCalledWith({
        where: { id: getLikeMock.id },
      });
    });

    it("should throw an error if like is not found", async () => {
      likeRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(likeService.getLike("not-found-id")).rejects.toThrow(
        "Like not found"
      );
    });
  });

  describe("deletePost", () => {
    it("should throw an error if like is not found", async () => {
      likeRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(likeService.deleteLike("not-found-id")).rejects.toThrow(
        "Like not found"
      );
    });
    it("should delete like entity with specified id", async () => {
      likeRepository.findOne = jest.fn().mockReturnValue(getLikeMock);
      likeRepository.remove = jest.fn().mockReturnValue(getLikeMock);

      const result = await likeService.deleteLike(getLikeMock.id);

      expect(result).toEqual(getLikeMock);
      expect(likeRepository.findOne).toBeCalledWith({
        where: { id: getLikeMock.id },
      });
      expect(likeRepository.remove).toBeCalledWith(getLikeMock);
    });
  });
});
