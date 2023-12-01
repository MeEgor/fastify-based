import { Type } from "@sinclair/typebox"

export const postSchema = Type.Object({
  id: Type.String(),
  title: Type.String(),
  body: Type.String(),
})

export const createBody = Type.Object({
  title: Type.String(),
  body: Type.String()
})

export const createResponse = {
  201: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  })
}