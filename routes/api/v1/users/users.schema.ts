import { Type } from "@sinclair/typebox"

export const params = Type.Object({
  id: Type.String()
})

export const user = Type.Object({
  id: Type.Optional(Type.String()),
  name: Type.String(),
  email: Type.String()
})

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
  user
})

export const crudError = Type.Object({
  ok: Type.Boolean(),
  message: Type.String()
})

export const crudResponse = (successStatus: string) => ({
  [successStatus]: crudSuccess,
  '4xx': crudError
})

export const findUsersResponse = {
  '200': Type.Object({ ok: Type.Boolean(), users: Type.Array(user) })
}