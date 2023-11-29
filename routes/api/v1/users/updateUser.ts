import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"

export default async function UpdateUser(fastify: FastifyInstance) {
  return async (req: FastifyRequest, res: FastifyReply) => {
    res.send({ ok: true, user: {}, message: "UpdateUser" })
  } 
}