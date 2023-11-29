import { Type } from '@sinclair/typebox'
import { crudResponse, params } from './common.schema'

const body = Type.Object({
  name: Type.Optional(Type.String()),
  email: Type.Optional(Type.String()),
  password: Type.Optional(Type.String())
})

const response = crudResponse('200')

const schema = {
  params, body, response
}

export default schema