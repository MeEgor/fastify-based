import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./user"
import { Comment } from "./comment"

@Entity("posts")
export class Post {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  title!: string
   
  @Column()
  body!: string

  @Column({ type: "uuid" })
  authorId!: string

  @ManyToOne(() => User, user => user.posts)
  author!: User

  @OneToMany(() => Comment, comment => comment.post)
  comments!: Comment[]
}