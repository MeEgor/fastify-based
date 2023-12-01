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

const post = {
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  author: userShortSchema
}
export const postSchema = Type.Object(post)

const user = {
  ...userShort,
  posts: Type.Array(postSchema)
}
export const userSchema = Type.Object(user)
