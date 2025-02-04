import { Router } from "express"
import { SessionUserController } from "@/controllers/session-user-controller"

export const sessionRouter = Router()
const sessionUserController = new SessionUserController()

sessionRouter.post("/", sessionUserController.sessionUser)