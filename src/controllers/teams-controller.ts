import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { undefined, z } from "zod"

const prisma = new PrismaClient()

export class TeamsController {
  async create(request: Request, response: Response){
    const teamsSchema = z.object({
      name: z.string(),
      description: z.string().optional()
    })

    const { name, description } = teamsSchema.parse(request.body)

    const data = await prisma.teams.create({
      data: {
        name: name,
        description: description
      }
    })

    return response.status(201).json({ 
      message: " registered successfully!", 
      name: data.name, description: 
      data.description 
    })
  }

  async update(request: Request, response: Response){
    const paramsSchema = z.object({
      id: z.string().uuid()
    })
    const { id } = paramsSchema.parse(request.params)

    const querySchema = z.object({
      name: z.string().min(1).optional(),
      description: z.string().min(1).optional()
    })
    const { name, description } = querySchema.parse(request.body)

    await prisma.teams.update({
      data: {
        name: name,
        description: description
      },
      where: {
        id: id
      }
    })

    return response.status(200).json({ message: "Data updated successfully" })
  }
}