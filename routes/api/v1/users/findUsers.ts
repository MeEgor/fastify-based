import { Type } from "@sinclair/typebox"
import { FastifyTypeBox } from "app"
import { user } from "./common.schema"

const response = {
  '200': Type.Object({ ok: Type.Boolean(), users: Type.Array(user) })
}

const schema = {
  response
}

export default async function FindUsers(fastify: FastifyTypeBox) {
  fastify.get("", { schema }, async (req, res) => {
    const users = [{ name: "foo", email: "bar" }]
    res.send({ ok: true, users })
  })
}