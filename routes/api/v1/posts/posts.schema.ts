import { Type } from "@sinclair/typebox"
import { postSchema } from "../v1.schema"

export const createBody = Type.Object({
  title: Type.String(),
  body: Type.String()
})

export const updateBody = Type.Object({
  title: Type.Optional(Type.String()),
  body: Type.Optional(Type.String())
})

const crudSuccess = Type.Object({
  ok: Type.Boolean(),
  post: postSchema
})

const crudError = Type.Object({
  ok: Type.Boolean(),
  message: Type.String()
})

export const crudResponse = {
  '2xx': crudSuccess,
  '4xx': crudError
}

export const findPostResponse = {
  200: Type.Object({ ok: Type.Boolean(), post: postSchema }),
  404: crudError
}

export const findPostsResponse = {
  200: Type.Object({ ok: Type.Boolean(), posts: Type.Array(postSchema) })
}