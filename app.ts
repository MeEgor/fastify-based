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
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export type FastifyTypeBox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression<RawServerDefault>,
  RawReplyDefaultExpression<RawServerDefault>,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>

export async function build(opts: FastifyServerOptions = {}) {
  const app = fastify(opts).withTypeProvider<TypeBoxTypeProvider>()
  
  // register swagger
  app.register(fastifySwagger, {
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
  app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
      docExpansion: 'full',
      deepLinking: false
    },
    uiHooks: {
      onRequest: function (request, reply, next) { next() },
      preHandler: function (request, reply, next) { next() }
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
    transformSpecification: (swaggerObject, request, reply) => { return swaggerObject },
    transformSpecificationClone: true
  })
  
  // collects routes to display on start
  app.register(routes)

  // register routes
  app.register(Routes)
  
  return app
}