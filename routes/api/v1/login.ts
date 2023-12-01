import { Type } from "@sinclair/typebox"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import { FastifyTypeBox } from "app"
import { jwtSecret } from "../../../config"
import { userShortSchema } from "./v1.schema"

export default async function Login (fastify: FastifyTypeBox) {
  const { db } = fastify

  const schema = {
    tags: ['Auth'],
    description: 'Login',
    body: Type.Object({
      email: Type.String(),
      password: Type.String()
    }),
    response: {
      200: Type.Object({
        ok: Type.Boolean(),
        user: userShortSchema
      }),
      401: Type.Object({
        ok: Type.Boolean(),
        message: Type.String()
      })
    }
  }

  fastify.post('/login', { schema }, async (req, res) => {
    const { email, password } = req.body
    const user = await db.users.findOne({ where: { email } })
    if (!user)
      return res.status(401).send({ ok: false, message: 'Email or password incorrect' })
  
    /**
     * TODO: move password stuff to util / service
     */
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword)
    if (!isValidPassword)
      return res.status(401).send({ ok: false, message: 'Email or password incorrect' })

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1d' })
    const refreshToken = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '7d' })
    
    res.header('Access-Token', token)
    res.header('Refresh-Token', refreshToken)
    res.send({ ok: true, user })
  })
}