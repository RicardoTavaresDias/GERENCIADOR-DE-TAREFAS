import { Router } from "express"
import { TeamMembersController } from "@/controllers/team-members-controller"
import { authentication } from "@/middlewares/authentication"
import { checkMember } from "@/middlewares/checkmember"

export const teammembersRoutes = Router()
const teamMembersController = new TeamMembersController()

teammembersRoutes.use(authentication)
teammembersRoutes.post("/", checkMember(["admin"]), teamMembersController.create)
teammembersRoutes.delete("/:id", checkMember(["admin"]), teamMembersController.remover)
teammembersRoutes.get("/", checkMember(["admin", "member"]), teamMembersController.show)