import { FastifyTypeBox } from "app"
import { params } from "../v1.schema"
import { crudResponse as response } from "./posts.schema"


const schema = {
  description: 'Delete post',
  tags: ['Posts'],
  params, response
}

export default async function DeletePost (fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.delete("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const post = await db.posts.findOne({ 
      where: { id },
      relations: ["author"]
    })
    if (!post) {
      res.status(404).send({ ok: false, message: "Post not found" })
      return
    }

    await db.posts.remove(post)
    db.posts.merge(post, { id })

    res.send({ ok: true, post })
  })
}