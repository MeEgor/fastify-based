import { FastifyTypeBox } from "app"
import { crudResponse, params, updateBody as body } from "./users.schema"

const response = crudResponse('200')
const schema = {
  description: 'Update user',
  tags: ['Users'],
  params, body, response
}

export default async function UpdateUser(fastify: FastifyTypeBox) {
  fastify.patch('/:id', { schema }, async (req, res) => {
    let user = { name: "default name", email: "default@foo.qwe", ...req.body }
    res.send({ ok: true, user })
  })
}