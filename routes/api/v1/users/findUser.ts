import { FastifyTypeBox } from "app"
import { crudResponse, params } from "./common.schema"


const response = crudResponse('200')

const schema = {
  params, response
}

export default async function FindUser(fastify: FastifyTypeBox) {
  fastify.get("/:id", { schema }, async (req, res) => {
    const user = { email: "bar", name: "foo" }
    res.send({ ok: true, user })
  })
}
  