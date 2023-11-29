import 'json-schema-to-ts'
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import fastify, { FastifyInstance, FastifyServerOptions } from "fastify"
import {
  FastifyBaseLogger,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault
} from 'fastify'
import { Type } from '@sinclair/typebox'
import routes from '@fastify/routes'
import Routes from "./routes/routes"

export type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export async function build(opts: FastifyServerOptions = {}) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>()

  app.get("/hello/:name", {
    schema: {
      params: Type.Object({
        name: Type.String()
      })
    }
  }, async (req, res) => {
    const name = req.params.name
  })
  
  // collects routes to display on start
  app.register(routes)

  // register routes
  app.register(Routes)
  
  return app
}