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
      posts: Repository<Post>,
      dataSource: DataSource
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
    const dataSource = new DataSource({
      type: "postgres",
      ...connectionConfig,
      entities,
      synchronize: true,
      logging: true,
    })

    await dataSource.initialize()

    server.decorate("db", {
      dataSource,
      users: dataSource.getRepository(User),
      posts: dataSource.getRepository(Post)
    })
  } catch (error) {
    console.log(error)
  }
})

export default db