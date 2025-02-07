import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export class TaskHistoryController {
  async index(request: Request, response: Response){
    const datataskhistory = await prisma.taksHistory.findMany({
      include: {
        taskid: false,
        changedby: false,
        users: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        tasks: {
          select: {
            id: true,
            title: true,
            description: true,
            status: true,
            priority: true,
            updatedat: true
          }
        }
      } as any,
      orderBy: {
        id: "asc"
      }
    })

    response.json(datataskhistory)
  }
}