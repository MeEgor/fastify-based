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
    const userId = req.userId
    const author = db.users.create({ id: userId })
    const post = db.posts.create({ title, body, author })
    await db.posts.save(post, { reload: true })
    
    res.status(201).send({ ok: true, post })
  })
}