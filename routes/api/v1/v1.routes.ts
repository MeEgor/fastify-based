import { FastifyInstance } from "fastify"
import UsersRoutes from "./users/users.routes"
import PostsRoutes from "./posts/posts.routes"
// import authPlugin from "../../../plugins/auth"
// import { jwtSecret } from "../../../config"

export default async function V1Routes (fastify: FastifyInstance) {
  // TODO: Fix auth
  // fastify.register(authPlugin, { secret: jwtSecret })

  fastify.register(UsersRoutes, { prefix: "/users" })
  fastify.register(PostsRoutes, { prefix: "/posts" })
}