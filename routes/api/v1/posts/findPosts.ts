import { FastifyTypeBox } from "app"
import { findPostsResponse as response } from "./posts.schema"
import { Comment, Post } from "../../../../models"
// another way to use database
// allow au to use database in any file
// speially in services
import { dataSource } from "../../../../plugins/db"

const schema = {
  tags: ['Posts'],
  description: 'Find posts',
  response
}
const postsReposittory = dataSource.getRepository(Post)
const commentsRepository = dataSource.getRepository(Comment)

function indexBy<T, K extends keyof T>(collection: T[], callback: (item: T) => K): Record<K, T> {
  return collection.reduce((acc: Record<K, T>, item: T) => {
    const key = callback(item)
    acc[key] = item
    return acc
  }, {} as Record<K, T>)
}

export function groupBy<T, K extends keyof any>(collection: T[], callback: (item: T) => K): Record<K, T[]> {
  return collection.reduce((acc: Record<K, T[]>, item: T) => {
    const key = callback(item)
    if (!acc[key]) acc[key] = []
    acc[key].push(item)
    return acc
  }, {} as Record<K, T[]>)
}

// TODO: move fetching / preloading to a service
export async function preloadComments (posts: Post[]) {
  const subQuery = posts.map(post => `(${
    commentsRepository.createQueryBuilder("comments")
      .select("id")
      .where(`"postId" = '${post.id}'`)
      .limit(2)
      .getQuery()
  })`).join(' UNION ')
  const comments = await commentsRepository.createQueryBuilder("comments")
    .leftJoinAndSelect("comments.author", "author")
    .where(`"comments"."id" IN (${subQuery})`)
    .getMany()
  const commentsByPostId = groupBy(comments, c => c.postId)

  posts.forEach(post => {
    post.comments = commentsByPostId[post.id] || []
  })
}

export default async function FindPosts (fastify: FastifyTypeBox) {
  fastify.get("", { schema }, async (req, res) => {
    const posts = await postsReposittory.createQueryBuilder("posts")
      .leftJoinAndSelect("posts.author", "author")
      .orderBy("posts.id", "DESC")
      .limit(10)
      .getMany()
    
    // Preload comments
    await preloadComments(posts)
    
    res.send({ ok: true, posts })
  })
}