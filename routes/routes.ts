import { FastifyInstance } from "fastify"
import apiRoutes from "./api/api.routes"

export default async function Routes (fastify: FastifyInstance) {
  fastify.register(apiRoutes, { prefix: "/api" })
}