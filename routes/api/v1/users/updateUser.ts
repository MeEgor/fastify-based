import { FastifyTypeBox } from "app"
import { crudResponse, params, updateBody as body } from "./users.schema"
import bcrypt from 'bcrypt'

const response = crudResponse('200')
const schema = {
  description: 'Update user',
  tags: ['Users'],
  params, body, response
}

export default async function UpdateUser(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.patch('/:id', { schema }, async (req, res) => {
    const id = req.params.id
    let user = await db.users.findOne({
      where: { id }
    })

    // 404
    if (!user) {
      res.status(404).send({ ok: false, message: "User not found" })
      return
    }

    const { name, email, password } = req.body
    db.users.merge(user, { name, email })

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10)
      db.users.merge(user, { hashedPassword })
    }
    
    user = await db.users.save(user)

    res.send({ ok: true, user })
  })
}