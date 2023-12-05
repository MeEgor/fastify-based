import { FastifyTypeBox } from "app"
import { findUserResponse as response } from "./users.schema"
import { params } from "../v1.schema"
import { preloadComments } from "../posts/findPosts"

const schema = {
  description: 'Find user by id',
  tags: ['Users'],
  params, response
}

export default async function FindUser(fastify: FastifyTypeBox) {
  const { db: { users, posts: postsReposittory, comments: commentsRepository } } = fastify

  fastify.get("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    const user = await users.createQueryBuilder("users").where("users.id = :id", { id }).getOne()

    // 404
    if (!user) {
      res.status(404).send({ ok: false, message: "User not found" })
      return
    }
    const posts = await postsReposittory.createQueryBuilder("posts")
      .where("posts.authorId = :id", { id }).limit(10).orderBy("posts.id", "DESC").getMany()
    
    // Preload comments to posts
    await preloadComments(posts)
    // Push posts to user
    posts.forEach(post => post.author = user)
    user.posts = posts
    // 200
    res.send({ ok: true, user })
  })
}
  