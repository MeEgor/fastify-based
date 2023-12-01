import { FastifyTypeBox } from "app"
import { crudResponse } from "./users.schema"
import { params } from "../v1.schema"

const response = crudResponse('200')
const schema = {
  description: 'Find user by id',
  tags: ['Users'],
  params, response
}

export default async function FindUser(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.get("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const user = await db.users.findOne({
      where: { id },
      relations: ['posts']
    })

    // 404
    if (!user) {
      res.status(404).send({ ok: false, message: "User not found" })
      return
    }

    // 200
    res.send({ ok: true, user })
  })
}
  