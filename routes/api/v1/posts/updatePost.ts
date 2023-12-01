import { FastifyTypeBox } from "app"
import { updateBody as body, updateResponse as response } from "./posts.schema"
import { params } from "../v1.schema"

const schema = {
  tags: ['Posts'],
  description: 'Update post by id',
  params, body, response
}

export default async function UpdatePost (fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.patch("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const { title, body } = req.body
    const post = await db.posts.findOne({ where: { id } })

    if (!post) {
      res.status(404).send({ ok: false, message: "Post not found" })
      return
    }

    db.posts.merge(post, { title, body })
    await db.posts.save(post)

    res.send({ ok: true, post })
  })
}