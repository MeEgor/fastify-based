import fp from "fastify-plugin"
import { DataSource, Repository } from "typeorm"
import { User, Post } from "../models"
import { 
  dbHost as host,
  dbPort as port,
  dbName as database,
  dbUser as username,
  dbPass as password
} from "../config"

declare module 'fastify' {
  interface FastifyInstance {
    db: {
      users: Repository<User>,
      posts: Repository<Post>
    }
  }
}

const entities = [
  User, Post
]

const db = fp(async server => {
  const connectionConfig = {
    host,
    port,
    username,
    password,
    database
  }
  
  try {
    const appDataSource = new DataSource({
      type: "postgres",
      ...connectionConfig,
      entities,
      synchronize: true,
      logging: true,
    })

    await appDataSource.initialize()

    server.decorate("db", {
      users: appDataSource.getRepository(User),
      posts: appDataSource.getRepository(Post)
    })
  } catch (error) {
    console.log(error)
  }
})

export default db