import { User } from "@/entities/user.entity";
import { Repository } from "typeorm";
import { PostService } from "@/services/post.service";
import { Post } from "@/entities/post.entity";
import { userMock } from "./__mocks__/user.mock";
import { savePostMock, getPostMock } from "./__mocks__/post.mock";

describe("PostService", () => {
  let postService: PostService;
  let postRepository: Repository<Post>;
  let userRepository: Repository<User>;

  beforeAll(() => {
    postRepository = {} as Repository<Post>;
    userRepository = {} as Repository<User>;
    postService = new PostService(postRepository, userRepository);
  });

  describe("createPost", () => {
    it("should return created post if user is found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(userMock);
      postRepository.create = jest.fn().mockReturnValue({});
      postRepository.save = jest.fn().mockReturnValue(savePostMock);

      const result = await postService.createPost(
        savePostMock.title,
        savePostMock.content,
        savePostMock.author.id
      );

      expect(result).toEqual(savePostMock);
      expect(postRepository.create).toHaveBeenCalledWith({
        title: savePostMock.title,
        content: savePostMock.content,
        author: userMock,
      });
    });

    it("should throw an error if user is not found", async () => {
      userRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(
        postService.createPost(
          savePostMock.title,
          savePostMock.content,
          "not-found-id"
        )
      ).rejects.toThrow("User not found");
    });
  });

  describe("getAllPosts", () => {
    it("should return all posts", async () => {
      postRepository.find = jest.fn().mockReturnValue([getPostMock]);

      const result = await postService.getAllPosts();

      expect(result).toEqual([getPostMock]);
      expect(postRepository.find).toHaveBeenCalledWith({});
    });
  });

  describe("getPost", () => {
    it("should return post with specified id", async () => {
      postRepository.findOne = jest.fn().mockReturnValue(getPostMock);

      const result = await postService.getPost(getPostMock.id);

      expect(result).toEqual(getPostMock);
      expect(postRepository.findOne).toHaveBeenCalledWith({
        where: { id: getPostMock.id },
      });
    });

    it("should throw an error if post is not found", async () => {
      postRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(postService.getPost("not-found-id")).rejects.toThrow(
        "Post not found"
      );
    });
  });

  describe("updatePost", () => {
    it("should throw an error if post is not found", async () => {
      postRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(
        postService.updatePost("not-found-id", { title: "Title2" })
      ).rejects.toThrow("Post not found");
    });

    it("should update the post with specified id", async () => {
      const updatedFields = { title: "UpdatedTitle" };
      postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
      postRepository.save = jest
        .fn()
        .mockReturnValue({ ...getPostMock, ...updatedFields });

      const result = await postService.updatePost(
        getPostMock.id,
        updatedFields
      );

      expect(result).toEqual({ ...getPostMock, ...updatedFields });
      expect(postRepository.findOne).toBeCalledWith({
        where: { id: getPostMock.id },
      });
    });
  });

  describe("deletePost", () => {
    it("should throw an error if post is not found", async () => {
      postRepository.findOne = jest.fn().mockReturnValue(undefined);

      expect(postService.deletePost("not-found-id")).rejects.toThrow(
        "Post not found"
      );
    });
    it("should delete post with specified id and return that post", async () => {
      postRepository.findOne = jest.fn().mockReturnValue(getPostMock);
      postRepository.remove = jest.fn().mockReturnValue(getPostMock);

      const result = await postService.deletePost(getPostMock.id);

      expect(result).toEqual(getPostMock);
      expect(postRepository.findOne).toBeCalledWith({
        where: { id: getPostMock.id },
      });
      expect(postRepository.remove).toBeCalledWith(getPostMock);
    });
  });
});
