import fastify, { FastifyServerOptions } from "fastify"
import routes from '@fastify/routes'
import Routes from "./routes/routes"

export async function build(opts: FastifyServerOptions = {}) {
  const app = fastify(opts)
  
  // collects routes to display on start
  app.register(routes)

  // register routes
  app.register(Routes)
  
  return app
}