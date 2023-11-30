import { FastifyTypeBox } from "app"
import { findUsersResponse as response } from "./users.schema"

const schema = {
  description: 'Find users',
  tags: ['Users'],
  response
}

export default async function FindUsers(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.get("", { schema }, async (req, res) => {
    const users = await db.users.find()

    res.send({ ok: true, users })
  })
}