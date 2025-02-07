import { Request, Response } from "express";
import { z } from "zod"
import { PrismaClient } from "@prisma/client";
import { Unauthorized, NotFound } from "@/utils/error";

const prisma = new PrismaClient()

export class TeamMembersController{
  async show(request: Request, response: Response){
    const dataTeamMembers = await prisma.teamMembers.findMany({
      include: {
        id: false,  
        teamid: false, 
        createdat: false,
        user: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        teams: {
          select: {
            id: true,
            name: true,
            description: true
          }
        }
      }as any,    
    })
    if(!dataTeamMembers){
      throw new NotFound("not found")
    }

    const userid = dataTeamMembers.map(({ userid, ...value }) => userid)

    if(request.headers.role === "member"){
      if(userid.includes(request.headers.id as string)){
        return response.status(200).json(
          dataTeamMembers.filter(value => value.userid === request.headers.id)
        )
      }else{
        throw new NotFound("Not Found")
      }
    }
    return response.status(200).json(dataTeamMembers.map(({ userid, ...rest }) => rest))
  }

  async create(request: Request, response: Response){
    const idSchema = z.object({
      idUsers: z.string().uuid(),
      idTeams: z.string().uuid()
    })

    const { idUsers, idTeams } = idSchema.parse(request.body)

    const  dataVerification  = await prisma.teamMembers.findFirst({
      where: {
        userid: idUsers
      }
    })
    
    if(dataVerification){
      throw new Unauthorized("Member already included in the team")
    }

    await prisma.teamMembers.create({
      data: {
        userid: idUsers,
        teamid: idTeams,
      }
    })

    return response.status(201).json({ message: "registered successfully!" })
  }

  async remover(request: Request, response: Response){
    try{
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
    }catch(error){
      throw new NotFound("Incorrect identification")
    }
  }

}