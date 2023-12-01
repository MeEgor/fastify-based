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

export const createResponse = {
  201: Type.Object({
    ok: Type.Boolean(),
    post: postSchema
  })
}