import { FastifyTypeBox } from "app"
import { createBody as body, createResponse as response } from "./posts.schema"

const schema = {
  description: 'Create post',
  tags: ['Posts'],
  body, response
}

export default async function CreatePost (fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.post('', { schema }, async (req, res) => {
    const { title, body } = req.body
    const authorId = req.userId
    const author = await db.users.preload({ id: authorId })
    const post = db.posts.create({ title, body, author })
    await db.posts.save(post)
    
    res.status(201).send({ ok: true, post })
  })
}