import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { Post } from "./post"
import { User } from "./user"

@Entity("comments")
export class Comment {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  body!: string

  @Column({ type: "uuid" })
  postId!: string

  @ManyToOne(() => Post, post => post.comments)
  post!: Post

  @Column({ type: "uuid" })
  authorId!: string

  @ManyToOne(() => User, user => user.comments)
  author!: User
}