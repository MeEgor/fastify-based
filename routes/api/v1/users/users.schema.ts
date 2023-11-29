import { Type } from "@sinclair/typebox"

export const params = Type.Object({
  id: Type.String()
})

export const user = Type.Object({
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

export const crudResponse = (successStatus: string) => ({
  [successStatus]: crudSuccess
})

export const findUsersResponse = {
  '200': Type.Object({ ok: Type.Boolean(), users: Type.Array(user) })
}