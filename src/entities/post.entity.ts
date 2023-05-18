import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Like } from "./like.entity";
import { User } from "./user.entity";

@Entity("Post")
export class Post {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.posts, {
    onDelete: "CASCADE",
  })
  author: User;

  @OneToMany(() => Like, (like) => like.post, {
    cascade: true,
  })
  liked: Like[];
}
