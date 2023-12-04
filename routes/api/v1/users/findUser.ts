import { FastifyTypeBox } from "app"
import { findUserResponse as response } from "./users.schema"
import { params } from "../v1.schema"
import { User } from "../../../../models"

const schema = {
  description: 'Find user by id',
  tags: ['Users'],
  params, response
}

export default async function FindUser(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.get("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const user = await db.dataSource.createQueryBuilder(User, 'user')
      .leftJoinAndSelect('user.posts', 'posts')
      .where(`user.id = :id`, { id })
      .getOne()

    // 404
    if (!user) {
      res.status(404).send({ ok: false, message: "User not found" })
      return
    }
    
    // Push author to posts
    user.posts.forEach(post => post.author = user)

    // 200
    res.send({ ok: true, user })
  })
}
  