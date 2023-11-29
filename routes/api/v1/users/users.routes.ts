import { FastifyInstance } from "fastify"

import FindUsers from "./findUsers"
import FindUser from "./findUser"
import CreateUser from "./createUser"
import UpdateUser from "./updateUser"
import DeleteUser from "./deleteUser"

export default async function UsersRoutes (fastify: FastifyInstance) {
  fastify.register(FindUsers)
  fastify.register(FindUser)
  fastify.register(CreateUser)
  fastify.register(UpdateUser)
  fastify.register(DeleteUser)
}