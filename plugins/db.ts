import fp from "fastify-plugin"
import { DataSource, Repository } from "typeorm"
import { User } from "../models"
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
      users: Repository<User>
    }
  }
}

const entities = [
  User
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
      users: appDataSource.getRepository(User)
    })
  } catch (error) {
    console.log(error)
  }
})

export default db