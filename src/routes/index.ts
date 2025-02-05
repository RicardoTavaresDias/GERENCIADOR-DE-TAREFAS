import { Router } from "express";
import { usersRouter } from "./login-routes";
import { sessionRouter } from "./session-routes";
import { teamsRouter } from "./teams-routes";
import { teammembersRoutes } from "./team-members-routes";

export const routes = Router()

routes.use("/login", usersRouter)
routes.use("/session", sessionRouter)
routes.use("/teams", teamsRouter)
routes.use("/team-members", teammembersRoutes)
