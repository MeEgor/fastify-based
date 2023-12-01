import { FastifyTypeBox } from "app"
import { params } from "../v1.schema"
import { findPostResponse as response } from "./posts.schema"

const schema = {
  tags: ['Posts'],
  description: 'Find post by id',
  params, response
}

export default async function FindPost (fastify: FastifyTypeBox) {
  const { db } = fastify
  
  fastify.get("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const post = await db.posts.findOne({ 
      where: { id },
      relations: ["author"]
    })
    if (!post) {
      res.status(404).send({ ok: false, message: "Post not found" })
      return
    }

    res.send({ ok: true, post })
  })
}