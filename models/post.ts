import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm"
import { User } from "./user"

@Entity("posts")
export class Post {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  title!: string
   
  @Column()
  body!: string

  @ManyToOne(() => User, user => user.posts)
  author!: User
}