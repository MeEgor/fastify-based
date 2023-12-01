import { FastifyInstance } from "fastify"
import fastifySwagger from "@fastify/swagger"
import fastifySwaggerUi from "@fastify/swagger-ui"
import V1Routes from "./v1/v1.routes"
import Login from "./v1/login"

export default async function ApiRoutes(fastify: FastifyInstance) {
  // register swagger
  fastify.register(fastifySwagger, {
    swagger: {
      info: {
        title: 'Fastify Based',
        description: 'Fastify Based API Documentation',
        version: '0.1.0'
      },
      tags: [
        { name: 'Users', description: 'User related end-points' },
        { name: 'Posts', description: 'Post related end-points' }
      ],
    }
  })
  fastify.register(fastifySwaggerUi, {
    routePrefix: '/docs'
  })

  // Move POST /login outside authorization check
  fastify.register(Login, { prefix: "/v1" })
  
  fastify.register(V1Routes, { prefix: "/v1" })
}