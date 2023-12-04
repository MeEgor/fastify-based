import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn, OneToMany } from "typeorm"
import { Post } from "./post"

@Entity("users")
export class User {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  name!: string

  @Column()
  email!: string
  
  @Column({ select: false })
  hashedPassword!: string

  @OneToMany(() => Post, post => post.author)
  posts!: Post[]
}