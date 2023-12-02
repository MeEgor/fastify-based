import { Type } from "@sinclair/typebox"
import { userShortSchema, userSchema } from "../v1.schema"

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

const crudSuccess = Type.Object({
  ok: Type.Boolean(),
  user: userShortSchema
})

const crudError = Type.Object({
  ok: Type.Boolean(),
  message: Type.String()
})

export const crudResponse = {
  '2xx': crudSuccess,
  '4xx': crudError
}

export const findUserResponse = {
  200: Type.Object({ ok: Type.Boolean(), user: userSchema }),
  404: crudError
}

export const findUsersResponse = {
  200: Type.Object({ ok: Type.Boolean(), users: Type.Array(userShortSchema) })
}