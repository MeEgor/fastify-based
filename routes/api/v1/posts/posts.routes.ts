import { FastifyInstance } from "fastify"

import FindPosts from "./findPosts"
import FindPost from "./findPost"
import CreatePost from "./createPost"
import UpdatePost from "./updatePost"
import DeletePost from "./deletePost"

export default async function PostsRoutes (fastify: FastifyInstance) {
  fastify.register(FindPosts)
  fastify.register(FindPost)
  fastify.register(CreatePost)
  fastify.register(UpdatePost)
  fastify.register(DeletePost)
}