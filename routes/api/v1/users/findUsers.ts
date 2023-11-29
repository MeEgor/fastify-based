import { FastifyTypeBox } from "app"
import { findUsersResponse as response } from "./users.schema"

const schema = {
  description: 'Find users',
  tags: ['Users'],
  response
}

export default async function FindUsers(fastify: FastifyTypeBox) {
  fastify.get("", { schema }, async (req, res) => {
    const users = [{ name: "foo", email: "bar" }]
    res.send({ ok: true, users })
  })
}