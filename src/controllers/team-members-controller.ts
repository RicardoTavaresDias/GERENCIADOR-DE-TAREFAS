import { Request, Response } from "express";
import { string, z } from "zod"
import { PrismaClient } from "@prisma/client";
import { Unauthorized } from "@/utils/error";

const prisma = new PrismaClient()

export class TeamMembersController{
  async create(request: Request, response: Response){
    const idSchema = z.object({
      idUsers: z.string().uuid(),
      idTeams: z.string().uuid()
    })

    const { idUsers, idTeams } = idSchema.parse(request.body)

    const [ dataVerification ] = await prisma.teamMembers.findMany({
      where: {
        userid: idUsers
      }
    })

    if(dataVerification.teamid === idTeams){
      throw new Unauthorized("Member already included in the team")
    }

    await prisma.teamMembers.create({
      data: {
        userid: idUsers,
        teamid: idTeams
      }
    })

    return response.status(201).json({ message: "registered successfully!" })
  }

  async delete(request: Request, response: Response){
    const idSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = idSchema.parse(request.params)

    await prisma.teamMembers.delete({
      where: {
        id: id
      }
    })

    return response.status(200).json({ menssage: "Removed team member" })    
  }

}