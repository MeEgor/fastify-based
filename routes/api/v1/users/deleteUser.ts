import { FastifyTypeBox } from "app"
import { crudResponse, params } from "./users.schema"

const response = crudResponse('200')
const schema = {
  description: 'Delete user',
  tags: ['Users'],
  params, response
}

export default async function DeleteUser(fastify: FastifyTypeBox) {
  fastify.delete('/:id', { schema }, async (req, res) => {
    let user = { name: "default name", email: "default@foo.qwe" }
    res.send({ ok: true, user })
  })
}