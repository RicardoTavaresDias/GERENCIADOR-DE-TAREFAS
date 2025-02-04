import { Router } from "express";
import { usersRouter } from "./login-routes";
import { sessionRouter } from "./session-routes";

export const routes = Router()

routes.use("/login", usersRouter)
routes.use("/session", sessionRouter)
