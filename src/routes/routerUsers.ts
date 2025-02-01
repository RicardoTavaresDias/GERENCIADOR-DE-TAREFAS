import { Router } from "express";
import { SessionUsersController } from "../controllers/sessionUsersController";

export const sessionRouter = Router()
const sessionUsersController = new SessionUsersController()

sessionRouter.get("/", sessionUsersController.teste)

