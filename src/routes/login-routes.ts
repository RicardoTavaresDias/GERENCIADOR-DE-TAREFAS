import { Router } from "express";
import { LoginController } from "../controllers/login-controller";

export const usersRouter = Router()
const loginController = new LoginController()

usersRouter.post("/", loginController.Create)


