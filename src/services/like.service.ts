import { Like } from "@/entities/like.entity";
import { Post } from "@/entities/post.entity";
import { User } from "@/entities/user.entity";
import { HttpException } from "@/exceptions/http.exception";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepo: Repository<Like>,
    @InjectRepository(Post)
    private postrepo: Repository<Post>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createLike(userId: string, postId: string): Promise<Like> {
    const findUser = await this.userRepo.findOne({ where: { id: userId } });

    const findPost = await this.postrepo.findOne({ where: { id: postId } });
    if (!findUser || !findPost) {
      // todo
      throw new HttpException(404, `${!findUser ? "User" : "Post"} not found`);
    }

    const createLike = this.likeRepo.create({ user: findUser, post: findPost });

    const { post, user, ...like } = await this.likeRepo.save(createLike);
    return await this.likeRepo.save(like);
  }

  async getAllLikes(): Promise<Like[]> {
    return await this.likeRepo.find({});
  }

  async getLike(id: string): Promise<Like> {
    const like = await this.likeRepo.findOne({
      where: { id },
    });

    if (!like) {
      throw new HttpException(404, `Like not found`);
    }

    return like;
  }

  async deleteLike(id: string): Promise<Like> {
    const like = await this.likeRepo.findOne({ where: { id } });

    if (!like) {
      throw new HttpException(404, `Like not found`);
    }

    return await this.likeRepo.remove(like);
  }
}
