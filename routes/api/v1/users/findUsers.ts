import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function FindUsers(fastify: FastifyInstance) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ ok: true, users: [] })
  } 
}