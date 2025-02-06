import { Router } from "express"
import { TeamMembersController } from "@/controllers/team-members-controller"
import { authentication } from "@/middlewares/authentication"
import { checkMember } from "@/middlewares/checkmember"

export const teammembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teammembersRoutes.use(authentication, checkMember(["admin"]))
teammembersRoutes.post("/", teamMembersController.create)
teammembersRoutes.delete("/:id", teamMembersController.remover)