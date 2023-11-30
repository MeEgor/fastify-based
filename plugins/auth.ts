import fp from "fastify-plugin"
import jwt, { JsonWebTokenError } from "jsonwebtoken"

/**
 * TODO: Сделать аутентификацию модульной
 * сейчас она работает не очень!
 */

declare module 'fastify' {
  interface FastifyRequest {
    userId: string
  }
}

export interface AuthPluginOptions {
  secret: string
}

type JwtPayload = {
  id: string
}

type Result<T> = {
  error: Error | null
  data: T | null
}

function jwtVerify(token: string, secret: string): Result<JwtPayload> {
  try {
    const payload = jwt.verify(token, secret)
    return {
      error: null,
      data: payload as JwtPayload
    }
  } catch (err) {
    return {
      error: err as JsonWebTokenError,
      data: null
    }
  }
}

export default fp(async (server, opts: AuthPluginOptions) => {
  const { secret } = opts
  console.log("auth plugin", opts)
  server.decorateRequest("userId", null)

  server.addHook("onRequest", async (request, reply) => {
    const authHeader = request.headers.authorization
    const token = authHeader?.split(" ")[1] as string
    const { data, error } = jwtVerify(token, secret)

    if (error)
      return reply.status(401).send({ ok: false, message: error.message })
    
    // add userId to FastifyRequest
    request.userId = data!.id
  })
})