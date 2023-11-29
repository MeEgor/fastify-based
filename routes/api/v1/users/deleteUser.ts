import { FastifyTypeBox } from "app"
import { crudSuccess, params } from "./common.schema"

const response = {
  '200': crudSuccess
}

const schema = {
  params, response
}

export default async function DeleteUser(fastify: FastifyTypeBox) {
  fastify.delete('/:id', { schema }, async (req, res) => {
    let user = { name: "default name", email: "default@foo.qwe" }
    res.send({ ok: true, user })
  })
}