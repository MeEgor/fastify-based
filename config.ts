// DB
const dbName = process.env.DB_NAME
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const dbHost = process.env.DB_HOST
const dbPort = parseInt(process.env.DB_PORT || "5432")

// JWT
const jwtSecret = process.env.JWT_SECRET || "secret"

export { dbHost, dbPort, dbUser, dbPass, dbName, jwtSecret }