import { Router } from "express";
import { sessionRouter } from "./routerUsers";

export const routes = Router()

routes.use("/session", sessionRouter)