import { Router } from "express";
import { TaskHistoryController } from "@/controllers/task-history-controller";
import { authentication } from "../middlewares/authentication"
import { checkMember } from "../middlewares/checkmember"

export const taskhistoryRoutes = Router()
const taskHistoryController = new TaskHistoryController()

taskhistoryRoutes.use(authentication, checkMember(["admin"]))
taskhistoryRoutes.get("/", taskHistoryController.index)