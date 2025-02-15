import express from "express"
import "express-async-errors"
import { routes } from "./routes"
import { APIError } from "./middlewares/APIError"

export const app =  express()
app.use(express.json())
app.use(routes)
app.use(APIError)

