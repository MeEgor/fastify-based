import { Type } from "@sinclair/typebox"

/**
 * Common params 
 */
export const params = Type.Object({
  id: Type.String()
})

/**
 * Common entity responses
 */
const userShort = {
  id: Type.String(),
  name: Type.String(),
  email: Type.String()
}
export const userShortSchema = Type.Object(userShort)

const comment = {
  id: Type.String(),
  body: Type.String(),
  postId: Type.String(),
  author: userShortSchema
}
export const commentSchema = Type.Object(comment)

const post = {
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  author: userShortSchema,
  comments: Type.Optional(Type.Array(commentSchema))
}
export const postSchema = Type.Object(post)

const user = {
  ...userShort,
  posts: Type.Optional(Type.Array(postSchema))
}
export const userSchema = Type.Object(user)
