import { Router } from "express";
import { TeamsController } from "@/controllers/teams-controller";
import { authentication } from "@/middlewares/authentication";
import { checkMember } from "@/middlewares/checkmember"; 

export const teamsRouter = Router()
const teamsController = new TeamsController()

teamsRouter.use(authentication, checkMember(["admin"]))
teamsRouter.post("/", teamsController.create)
teamsRouter.patch("/:id", teamsController.update)