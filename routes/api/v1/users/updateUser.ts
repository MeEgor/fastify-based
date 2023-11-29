import { Type } from "@sinclair/typebox"
import { FastifyTypeBox } from "app"
import { crudResponse, params } from "./users.schema"

const body = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
  password: Type.Optional(Type.String())
})

const response = crudResponse('200')

const schema = {
  params, body, response
}

export default async function UpdateUser(fastify: FastifyTypeBox) {
  fastify.patch('/:id', { schema }, async (req, res) => {
    let user = { name: "default name", email: "default@foo.qwe", ...req.body }
    res.send({ ok: true, user })
  })
}