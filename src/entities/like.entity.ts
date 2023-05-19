import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Post } from "./post.entity";
import { User } from "./user.entity";

@Entity("Like")
@Index(["user", "post"], { unique: true })
export class Like {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (user) => user.liked, {
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.liked, {
    onDelete: "CASCADE",
  })
  post: Post;

  @Column()
  postId: string;

  @Column()
  userId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
