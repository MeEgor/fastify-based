import { FastifyTypeBox } from "app"
import { params } from "../v1.schema"
import { findPostResponse as response } from "./posts.schema"
import { dataSource } from "../../../../plugins/db"
import { Comment, Post } from "../../../../models"

const schema = {
  tags: ['Posts'],
  description: 'Find post by id',
  params, response
}

const posts = dataSource.getRepository(Post)
const comments = dataSource.getRepository(Comment)

export default async function FindPost (fastify: FastifyTypeBox) {
  fastify.get("/:id", { schema }, async (req, res) => {
    const { id } = req.params
    // TODO: move fetching / preloading to a service
    const post = await posts.createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .where("posts.id = :id", { id })
      .getOne()

    if (!post) {
      res.status(404).send({ ok: false, message: "Post not found" })
      return
    }
    // Preload comments
    post.comments = await comments.createQueryBuilder("comments")
      .leftJoinAndSelect("comments.author", "author")
      .where("comments.postId = :id", { id })
      .limit(10)
      .getMany()

    res.send({ ok: true, post })
  })
}