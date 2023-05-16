import { Post } from "@/entities/post.entity";
import { User } from "@/entities/user.entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private repo: Repository<Post>
  ) {}

  async createPost(title: string, content: string, author: User): Promise<Post> {
    const post = this.repo.create({ title, content, author });

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

  async patchPost(id: string, updatedColumns: Partial<Post>): Promise<Post> {
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
