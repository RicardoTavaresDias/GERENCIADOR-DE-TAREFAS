import { Router } from "express";
import { LoginUser } from "../controllers/login-user-controller";
import { SessionUserController } from "../controllers/session-user-controller"

export const usersRouter = Router()
const loginUser = new LoginUser()

usersRouter.post("/", loginUser.CreateNewUsers)


