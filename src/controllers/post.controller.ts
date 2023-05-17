import { PostService } from "@/services/post.service";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";

@Service()
export class PostController {
  constructor(@Inject() private postService: PostService) {}

  createPost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.createPost(
        req.body.title,
        req.body.content,
        req.body.authorId
      );

      res.status(201).send(post);
    } catch (err) {
      next(err);
    }
  };

  getAllPosts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const posts = await this.postService.getAllPosts();

      res.status(200).send(posts);
    } catch (err) {
      next(err);
    }
  };

  getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.getPost(req.params.id);

      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.patchPost(req.params.id, req.body);

      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const post = await this.postService.deletePost(req.params.id);

      res.status(200).send(post);
    } catch (err) {
      next(err);
    }
  };
}
