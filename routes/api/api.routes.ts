import { FastifyInstance } from "fastify"
import V1Routes from "./v1/v1.routes"
import Login from "./v1/login"

export default async function ApiRoutes(fastify: FastifyInstance) {
  // Move POST /login outside authorization check
  fastify.register(Login, { prefix: "/v1" })
  
  fastify.register(V1Routes, { prefix: "/v1" })
}