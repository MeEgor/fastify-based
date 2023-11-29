import { FastifyInstance } from "fastify"
import UsersRoutes from "./users/users.routes"
import PostsRoutes from "./posts/posts.routes"

export default async function V1Routes (fastify: FastifyInstance) {
  fastify.register(UsersRoutes, { prefix: "/users" })
  fastify.register(PostsRoutes, { prefix: "/posts" })
}