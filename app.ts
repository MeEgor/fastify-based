import "reflect-metadata"
import dotenv from "dotenv"
dotenv.config()
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import fastify, { FastifyInstance, FastifyServerOptions } from "fastify"
import {
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from "fastify"
import routes from "@fastify/routes"
import Routes from "./routes/routes"
import db from "./plugins/db"

export type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export async function build(opts: FastifyServerOptions = {}) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>()

  // connect to db
  app.register(db)
  
  // collects routes to display on start
  app.register(routes)

  // register routes
  app.register(Routes)
  
  return app
}