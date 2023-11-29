import { FastifyInstance } from "fastify"

import FindUsers from "./findUsers"
import FindUser from "./findUser"
import CreateUser from "./createUser"
import UpdateUser from "./updateUser"
import DeleteUser from "./deleteUser"

export default async function UsersRoutes (fastify: FastifyInstance) {
  fastify.get("", await FindUsers(fastify))
  fastify.get("/:id", await FindUser(fastify))
  // fastify.post("", await CreateUser(fastify))
  fastify.register(CreateUser)
  fastify.patch("/:id", await UpdateUser(fastify))
  fastify.put("/:id", await UpdateUser(fastify))
  fastify.delete("/:id", await DeleteUser(fastify))
}