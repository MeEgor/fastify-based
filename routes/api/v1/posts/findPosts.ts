import { FastifyTypeBox } from "app"
import { findPostsResponse as response } from "./posts.schema"

const schema = {
  tags: ['Posts'],
  description: 'Find posts',
  response
}

export default async function FindPosts (fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.get("", { schema }, async (req, res) => {
    const posts = await db.posts.find({ relations: ["author"] })

    res.send({ ok: true, posts })
  })
}