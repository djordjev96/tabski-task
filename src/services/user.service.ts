import { User } from "@/entities/user.entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = this.repo.create({ name, email, password: hashedPassword });

    return await this.repo.save(user);
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find({});
  }

  async getUser(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      // make error
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id: string, updatedColumns: Partial<User>): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      // make error
      throw new Error("User not found");
    }

    if (updatedColumns.password) {
      updatedColumns.password = await bcrypt.hash(updatedColumns.password, 8);
    }

    Object.assign(user, updatedColumns);

    return await this.repo.save(user);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      // make error
      throw new Error("User not found");
    }

    return await this.repo.remove(user);
  }
}
