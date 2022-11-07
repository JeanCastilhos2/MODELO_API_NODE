const express = require("express")
const cors = require("cors")

import { connect } from "./db-connection"
import { defineRoutes } from "./routes"

const start = async () => {
  const port = process.env.PORT || 9000

  const app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(cors({ origin: "*" }))

  console.log("Establishing database connection...")
  await connect()
  console.log("Database connection established!")
  console.log("Starting application server...")

  defineRoutes(app)

  app.listen(port, () => {
    console.log(`Server's running in http://localhost:${port}`)
  });

}

start()
