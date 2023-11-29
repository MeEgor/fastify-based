import { FastifyTypeBox } from "app"
import { crudResponse, createBody as body } from "./users.schema"

const response = crudResponse('201')
const schema = {
  description: 'Create user',
  tags: ['Users'],
  body, response
}

export default async function CreateUser(fastify: FastifyTypeBox) {
  fastify.post('', { schema }, async (req, res) => {
    const { name, email } = req.body

    res.send({ ok: true, user: { name, email }})
  })
}