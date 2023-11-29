import { Type } from '@fastify/type-provider-typebox'

const body = Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String()
})

const success = Type.Object({
  ok: Type.Boolean(),
  user: Type.Object({
    name: Type.String(),
    email: Type.String()
  }),
  message: Type.Optional(Type.String())
})

const response = {
  '200': success
}

const schema = {
  body, response
}

export default schema