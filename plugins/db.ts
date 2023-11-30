import fp from "fastify-plugin"
import { DataSource, Repository } from "typeorm"
import { User } from "../models"

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
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
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