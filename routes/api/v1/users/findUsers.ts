import { FastifyTypeBox } from "app"
import { findUsersResponse as response } from "./users.schema"
import { Post } from "../../../../models"

const schema = {
  description: 'Find users',
  tags: ['Users'],
  response
}

export default async function FindUsers(fastify: FastifyTypeBox) {
  const { db } = fastify

  fastify.get("", { schema }, async (req, res) => {
    const users = await db.users.find()
    const userIds = users.map(user => user.id)

    // Create a series of subqueries for each userId.
    const queries = userIds.map(id => `(${
      db.posts.createQueryBuilder('post')
        .select("id")
        .where(`post."authorId" = '${id}'`)
        .limit(2)
        .getQuery()
    })`)

    // Combine all subqueries with UNION ALL.
    const fullQuery = queries.join(' UNION ')

    // Execute the combined query with userIds as parameters.
    const posts = await db.dataSource
      .createQueryBuilder(Post, 'post')
      .where(`post."id" IN (${fullQuery})`)
      .getMany()

    // Reduce the posts array to an object of userIds as keys and posts as values.
    const postsByUserId = posts.reduce((acc: {[key: string]: Post[]}, post: Post) => {
      const { authorId } = post
      if (!acc[authorId]) acc[authorId] = []
      acc[authorId].push(post)
      return acc
    }, {})
    
    // Push posts to their respective users and back.
    users.forEach(user => {
      user.posts = postsByUserId[user.id] || []
      user.posts.forEach(post => post.author = user)
    })

    res.send({ ok: true, users })
  })
}