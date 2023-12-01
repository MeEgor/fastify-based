import { FastifyTypeBox } from "app"
import { crudResponse } from "./users.schema"
import { params } from "../v1.schema"

const response = crudResponse('200')
const schema = {
  description: 'Delete user',
  tags: ['Users'],
  params, response
}

export default async function DeleteUser(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.delete('/:id', { schema }, async (req, res) => {
    const { id } = req.params
    let user = await db.users.findOne({
      where: { id }
    })

    // 404
    if (!user) {
      res.status(404).send({ ok: false, message: "User not found" })
      return
    }

    user = await db.users.remove(user)
    db.users.merge(user, { id }) // because of Type ORM remove id from deletet entity

    res.send({ ok: true, user })
  })
}