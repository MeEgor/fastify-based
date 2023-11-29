import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function FindUser(fastify: FastifyInstance) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    const user = { foo: "bar" }
    res.send({ ok: true, user })
  }
}
  