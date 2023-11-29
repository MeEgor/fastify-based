import { FastifyInstance } from "fastify"
import V1Routes from "./v1/v1.routes"
import Login from "./login"
import Register from "./register"

export default async function ApiRoutes(fastify: FastifyInstance) {
  fastify.get("/login", await Login(fastify))
  fastify.get("/register", await Register(fastify))
  
  fastify.register(V1Routes, { prefix: "/v1" })
}