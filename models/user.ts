import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Post } from "./post"
import { Comment } from "./comment"

@Entity("users")
export class User {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  name!: string

  @Column()
  email!: string
  
  @Column()
  hashedPassword!: string

  @OneToMany(() => Post, post => post.author)
  posts!: Post[]

  @OneToMany(() => Comment, comment => comment.author)
  comments!: Comment[]
}