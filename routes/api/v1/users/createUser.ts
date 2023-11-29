import { Type } from "@sinclair/typebox"
import { FastifyTypeBox } from "app"
import { crudResponse } from "./users.schema"

const body = Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String()
})

const response = crudResponse('201')

const schema = {
  body, response
}

export default async function CreateUser(fastify: FastifyTypeBox) {
  fastify.post('', { schema }, async (req, res) => {
    const { name, email } = req.body

    res.send({ ok: true, user: { name, email }})
  })
}