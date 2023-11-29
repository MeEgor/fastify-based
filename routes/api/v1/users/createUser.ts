import { FastifyTypeBox } from '../../../../app'
import schema from './createUser.schema'

export default async function CreateUser(fastify: FastifyTypeBox) {
  fastify.post('', { schema }, async (req, res) => {
    const { name, email } = req.body

    res.send({ ok: true, user: { name, email }, message: "CreateUser" })
  })
}