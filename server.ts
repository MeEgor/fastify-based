import { build } from "./app"

build({ logger: true })
  .then(server => server.listen({ port: 8000 }).then(address => {
    console.log(server.printRoutes())
    console.log(`Server listening at ${address}`)

    return server
  }))
  .then(server => server.swagger())
  .catch(err => {
    console.error(err)
    process.exit(1)
  })