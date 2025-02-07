import { Router } from "express";
import { usersRouter } from "./login-routes";
import { sessionRouter } from "./session-routes";
import { teamsRouter } from "./teams-routes";
import { teammembersRoutes } from "./team-members-routes";
import { tasksRouter } from "./tasks-routes";
import { taskhistoryRoutes } from "./task-history-routes"

export const routes = Router()

routes.use("/login", usersRouter)
routes.use("/session", sessionRouter)
routes.use("/teams", teamsRouter)
routes.use("/team-members", teammembersRoutes)
routes.use("/tasks", tasksRouter)
routes.use("/task-history", taskhistoryRoutes)
