import { Like } from "@/entities/like.entity";
import { Post } from "@/entities/post.entity";
import { User } from "@/entities/user.entity";
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
    const user = await this.userRepo.findOne({ where: { id: userId } });

    const post = await this.postrepo.findOne({ where: { id: postId } });
    if (!user || !post) {
      // todo
      throw new Error(`${!user ? "User" : "Post"} not found`);
    }

    const like = this.likeRepo.create({ user, post });

    return await this.likeRepo.save(like);
  }

  async getAllLikes(): Promise<Like[]> {
    return await this.likeRepo.find({});
  }

  async getLike(id: string): Promise<Like> {
    const like = await this.likeRepo.findOne({ where: { id } });

    if (!like) {
      // make new error
      throw new Error("Like not found");
    }

    return like;
  }

  async deleteLike(id: string): Promise<Like> {
    const like = await this.likeRepo.findOne({ where: { id } });

    if (!like) {
      // make new error
      throw new Error("Post not found");
    }

    return await this.likeRepo.remove(like);
  }
}
