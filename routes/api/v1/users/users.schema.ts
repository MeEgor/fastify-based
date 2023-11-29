import { Type } from "@sinclair/typebox"

export const params = Type.Object({
  id: Type.String()
})

export const user = Type.Object({
  name: Type.String(),
  email: Type.String()
})

export const crudSuccess = Type.Object({
  ok: Type.Boolean(),
  user
})

export const crudResponse = (successStatus: string) => ({
  [successStatus]: crudSuccess
})