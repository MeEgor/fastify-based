import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function FindPost (fastify: FastifyInstance) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ ok: true, message: "FindPost" })
  }
}