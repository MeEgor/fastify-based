import { FastifyInstance } from "fastify"

import FindPosts from "./findPosts"
import FindPost from "./findPost"
import CreatePost from "./createPost"
import UpdatePost from "./updatePost"
import DeletePost from "./deletePost"

export default async function PostsRoutes (fastify: FastifyInstance) {
  fastify.get("", await FindPosts(fastify))
  fastify.get("/:id", await FindPost(fastify))
  fastify.register(CreatePost)
  fastify.patch("/:id", await UpdatePost(fastify))
  fastify.put("/:id", await UpdatePost(fastify))
  fastify.delete("/:id", await DeletePost(fastify))
}