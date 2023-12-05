import { FastifyTypeBox } from "app"
import { findPostsResponse as response } from "./posts.schema"
import { Comment, Post } from "../../../../models"
// another way to use database
import { dataSource } from "../../../../plugins/db"

const schema = {
  tags: ['Posts'],
  description: 'Find posts',
  response
}
const postsReposittory = dataSource.getRepository(Post)
const commentsRepository = dataSource.getRepository(Comment)

// TODO: move fetching / preloading to a service
export async function preloadComments(posts: Post[]) {
  const subQuery = posts.map(post => `(${
    commentsRepository.createQueryBuilder("comments")
      .select("id").where(`"postId" = '${post.id}'`).limit(2)
      .getQuery()
  })`).join(' UNION ')
  const comments = await commentsRepository.createQueryBuilder("comments")
    .leftJoinAndSelect("comments.author", "author")
    .where(`"comments"."id" IN (${subQuery})`)
    .getMany()
  const commentsByPostId = comments.reduce((acc: {[key: string]: Comment[]}, comment: Comment) => {
    const { postId } = comment
    if (!acc[postId]) acc[postId] = []
    acc[postId].push(comment)
    return acc
  }, {})

  posts.forEach(post => {
    post.comments = commentsByPostId[post.id] || []
  })
}

export default async function FindPosts (fastify: FastifyTypeBox) {
  fastify.get("", { schema }, async (req, res) => {
    const posts = await postsReposittory.createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .limit(10)
      .getMany()
    
    // Preload comments
    await preloadComments(posts)
    
    res.send({ ok: true, posts })
  })
}