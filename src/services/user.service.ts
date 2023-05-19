import { User } from "@/entities/user.entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";
import { HttpException } from "@/exceptions/http.exception";

@Service()
export class UserService {
  constructor(
    @InjectRepository(User)
    protected repo: Repository<User>
  ) {}

  async createUser(
    name: string,
    email: string,
    password: string
  ): Promise<Partial<User>> {
    const hashedPassword = await bcrypt.hash(password, 8);

    const createUser = this.repo.create({
      name,
      email,
      password: hashedPassword,
    });

    const { password: string, ...user } = await this.repo.save(createUser);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.find({});
  }

  async getUser(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });
    if (!user) {
      throw new HttpException(404, "User not found");
    }

    return user;
  }

  async updateUser(
    id: string,
    updatedColumns: Partial<User>
  ): Promise<Partial<User>> {
    const findUser = await this.repo.findOne({ where: { id } });

    if (!findUser) {
      throw new HttpException(404, "User not found");
    }

    if (updatedColumns.password) {
      updatedColumns.password = await bcrypt.hash(updatedColumns.password, 8);
    }

    Object.assign(findUser, updatedColumns);

    const { password: string, ...user } = await this.repo.save(findUser);

    return user;
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.repo.findOne({ where: { id } });

    if (!user) {
      throw new HttpException(404, "User not found");
    }

    return await this.repo.remove(user);
  }
}
