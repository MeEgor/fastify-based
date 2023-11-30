import { v6 as uuidv6 } from "uuid-with-v6"
import { Entity, Column, PrimaryColumn } from "typeorm"

@Entity()
export class User {
  @PrimaryColumn({ type: "uuid" })
  id: string = uuidv6()

  @Column()
  name!: string

  @Column()
  email!: string
  
  @Column()
  hashedPassword!: string
}