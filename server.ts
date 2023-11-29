import { build } from "./app"

build({ logger: true }).then(server => server.listen({ port: 8000 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  // show routes on startup
  // const { routes } = server
  // console.log(JSON.stringify(server.routes, null, 4))
  console.log(server.printRoutes())
  console.log(`Server listening at ${address}`)
}))