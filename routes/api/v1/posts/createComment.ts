import { FastifyTypeBox } from "app"
import { params } from "../v1.schema"
import { createCommentBody as body, createCommentResponse as response } from "./posts.schema"

const schema = {
  description: 'Create comment',
  tags: ['Comments'],
  body, params, response
}

export default async function CreateComment (fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.post('/:id/comments', { schema }, async (req, res) => {
    const { id } = req.params
    const { body } = req.body
    const authorId = req.userId

    const post = await db.posts.findOne({ where: { id } })
    if (!post) {
      res.status(404).send({ ok: false, message: "Post not found" })
      return
    }

    const author = await db.users.preload({ id: authorId })
    const comment = db.comments.create({ body, author, post })
    await db.comments.save(comment)

    res.status(201).send({ ok: true, comment })
  })
}