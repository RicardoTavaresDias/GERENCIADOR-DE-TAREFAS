import { Router } from "express";
import { TasksController } from "@/controllers/tasks-controller";
import { authentication } from "@/middlewares/authentication";
import { checkMember } from "@/middlewares/checkmember";

export const tasksRouter = Router()
const tasksController = new TasksController()

tasksRouter.use(authentication)
tasksRouter.post("/", checkMember(["admin"]), tasksController.create)
tasksRouter.get("/", checkMember(["admin", "member"]), tasksController.index)
tasksRouter.patch("/:id", checkMember(["admin", "member"]), tasksController.update)
tasksRouter.delete("/:id", checkMember(["admin"]), tasksController.remover)