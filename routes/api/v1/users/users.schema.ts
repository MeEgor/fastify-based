import { Type } from "@sinclair/typebox"
import { userShortSchema, userShowSchema } from "../v1.schema"

export const createBody = Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String()
})

export const updateBody = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
  password: Type.Optional(Type.String())
})

export const crudSuccess = Type.Object({
  ok: Type.Boolean(),
  user: userShortSchema
})

export const crudError = Type.Object({
  ok: Type.Boolean(),
  message: Type.String()
})

export const crudResponse = (successStatus: string) => ({
  [successStatus]: crudSuccess,
  '4xx': crudError
})

export const findUserResponse = {
  '200': Type.Object({ ok: Type.Boolean(), user: userShowSchema })
}

export const findUsersResponse = {
  '200': Type.Object({ ok: Type.Boolean(), users: Type.Array(userShortSchema) })
}