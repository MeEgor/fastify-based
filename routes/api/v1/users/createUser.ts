import { FastifyTypeBox } from "app"
import { crudResponse as response, createBody as body } from "./users.schema"
import bcrypt from 'bcrypt'

const schema = {
  description: 'Create user',
  tags: ['Users'],
  body, response
}

export default async function CreateUser(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.post('', { schema }, async (req, res) => {
    const { name, email, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = db.users.create({ name, email, hashedPassword })

    await db.users.save(user)

    res.status(201).send({ ok: true, user })
  })
}