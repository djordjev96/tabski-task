import { LikeService } from "@/services/like.service";
import { NextFunction, Request, Response } from "express";
import { Inject, Service } from "typedi";

@Service()
export class LikeController {
  constructor(@Inject() private likeService: LikeService) {}

  createLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const like = await this.likeService.createLike(
        req.body.authorId,
        req.body.postId
      );

      res.status(201).send(like);
    } catch (err) {
      next(err);
    }
  };

  getAllLikes = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const likes = await this.likeService.getAllLikes();

      res.status(200).send(likes);
    } catch (err) {
      next(err);
    }
  };

  getLikeById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const like = await this.likeService.getLike(req.params.id);

      res.status(200).send(like);
    } catch (err) {
      next(err);
    }
  };

  deleteLike = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const like = await this.likeService.deleteLike(req.params.id);

      res.status(200).send(like);
    } catch (err) {
      next(err);
    }
  };
}
