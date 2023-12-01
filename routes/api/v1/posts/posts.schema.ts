import { Type } from "@sinclair/typebox"
import { userShortSchema } from "../v1.schema"


export const postSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
  author: userShortSchema
})

export const createBody = Type.Object({
  title: Type.String(),
  body: Type.String()
})

export const updateBody = Type.Object({
  title: Type.Optional(Type.String()),
  body: Type.Optional(Type.String())
})

const errorResponse = Type.Object({
  ok: Type.Boolean(),
  message: Type.String()
})

export const createResponse = {
  201: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  })
}

export const updateResponse = {
  200: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  }),
  404: errorResponse
}

export const deleteResponse = {
  200: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  }),
  404: errorResponse
}

export const findPostResponse = {
  200: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  }),
  404: errorResponse
}

export const findPostsResponse = {
  200: Type.Object({
    ok: Type.Boolean(),
    posts: Type.Array(postSchema)
  })
}