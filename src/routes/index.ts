import { Router } from "express";
import { usersRouter } from "./Users-routes";
import { sessionRouter } from "./session-routes";

export const routes = Router()

routes.use("/login", usersRouter)
routes.use("/", sessionRouter)
