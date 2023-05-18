import { Post } from "@/entities/post.entity";
import { User } from "@/entities/user.entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>,
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) {}

  async createPost(
    title: string,
    content: string,
    authorId: string
  ): Promise<Post> {
    const user = await this.userRepo.findOne({ where: { id: authorId } });

    if (!user) {
      throw new Error("User not found");
    }

    const post = this.repo.create({ title, content, author: user });

    return await this.repo.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.repo.find({});
  }

  async getPost(id: string): Promise<Post> {
    const post = await this.repo.findOne({ where: { id } });

    if (!post) {
      // make new error
      throw new Error("Post not found");
    }

    return post;
  }

  async updatePost(id: string, updatedColumns: Partial<Post>): Promise<Post> {
    const post = await this.repo.findOne({ where: { id } });

    if (!post) {
      // make new error
      throw new Error("Post not found");
    }

    Object.assign(post, updatedColumns);

    return await this.repo.save(post);
  }

  async deletePost(id: string): Promise<Post> {
    const post = await this.repo.findOne({ where: { id } });

    if (!post) {
      // make new error
      throw new Error("Post not found");
    }

    return await this.repo.remove(post);
  }
}
