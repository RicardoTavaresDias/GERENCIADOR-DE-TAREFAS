import { Request, Response } from "express";
import { z } from "zod"
import { PrismaClient } from "@prisma/client";
import { Unauthorized, NotFound } from "@/utils/error";

const prisma = new PrismaClient()

export class TasksController {
 async create(request: Request, response: Response){
    const tasksSchema = z.object({
      title: z.string(),
      description: z.string().optional(),
      userId: z.string().uuid(),
      teamId: z.string().uuid()
    })

    const { title, description, userId, teamId } = tasksSchema.parse(request.body)

    const existsTasks = await prisma.tasks.findFirst({
      where: {
        title: title
      }
    })

    if(existsTasks){
      throw new Unauthorized("Tasks already registered")
    }

    await prisma.tasks.create({
      data: {
        title: title,
        description: description,
        assignedto: userId,
        teamid: teamId
      }
    })

    return response.status(201).json({ message: "Tasks registered successfully" })
  }

  async index(request: Request, response: Response){
    const memberId = z.object({
      id: z.string().uuid()
    })
    const memberid = memberId.parse(request.headers)

      const dataTasks = 
      request.headers.role === "admin" ? 
      await prisma.tasks.findMany({
        orderBy: {
          priority: "asc"
        }
      }) : await prisma.tasks.findMany({
            where: {
              assignedto: memberid.id
            },
            orderBy: {
              priority: "asc"            
            }
        })
    return response.status(200).json(dataTasks)
  }

  async update(request: Request, response: Response){
    const idSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = idSchema.parse(request.params)

    const bodySchema = z.object({
      status: z.enum(["pending", "in_progress", "completed"]).optional(),
      priority: z.enum(["low", "medium", "high"]).optional(),
      title: z.string().optional(),
      description: z.string().optional()
    })
    
    const { status, priority, title, description } = bodySchema.parse(request.body)

    if(request.headers.role === "admin"){
      try{
        const dataold = await prisma.tasks.findFirst({
          where: {
            id: id
          }
        })
        const data = await prisma.tasks.update({
          data: {
            status: status,
            priority: priority,
          },
          where: {
            id: id
          }
        })
        const oldstatus = z.string().parse(dataold?.status)
        await prisma.taksHistory.create({
          data: {
            taskid: id,
            changedby: data.assignedto,
            oldstatus: oldstatus,
            newstatus: data.status
          }
        })
      }catch(error){
        throw new NotFound("Incorrect identification")
      }
    }

    if(request.headers.role === "member"){
      try {
        const idMemberSchema = z.object({
          id: z.string().uuid()
        })
        const idMember = idMemberSchema.parse(request.headers)
        await prisma.tasks.update({
          data: {
            title: title,
            description: description
          },
          where: {
            assignedto: idMember.id,
            id: id
          }
        })
      }catch(error){
        throw new Unauthorized("Not Unauthorized Update")
      }
    }
    return response.status(200).json("Data updated successfully")
  }

  async remover(request: Request, response: Response){
    const idSchema = z.object({
      id: z.string().uuid()
    })

    const { id } = idSchema.parse(request.params)

    // Remover dados que esta relacionado com taksHistory
    await prisma.taksHistory.deleteMany({
      where: {
        taskid: id
      }
    })

    // apos remover relacionamente, remove o dado da tabela tasks
    await prisma.tasks.delete({
      where: {
        id: id
      }
    })
    return response.status(200).json("Task removed successfully")
  }
}