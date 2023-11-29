import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function UpdatePost (fastify: FastifyInstance) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ ok: true, message: "UpdatePost" })
  }
}