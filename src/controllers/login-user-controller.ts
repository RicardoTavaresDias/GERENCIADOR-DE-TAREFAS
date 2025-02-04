import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"
import { hash } from "bcrypt";
import { Unauthorized  } from "../utils/error";

const prisma = new PrismaClient()

export class LoginUser {
   async CreateNewUsers(request: Request, response: Response){
     const dataSchema = z.object({
      name: z.string(),
      email: z.string().email(),
      password: z.string()
     })

     const { name, email, password } = dataSchema.parse(request.body)

     const existsUser = await prisma.users.findFirst({
      where: {
         email: email
         }
      })

      if(existsUser){
         throw new Unauthorized("User already registered")
      }

     const password_hash = await hash(password, 8)

     const user = await prisma.users.create({
      data: {
         name,
         email,
         password: password_hash
      }
     })

     return response.status(201).json({ message: user.name + " registered successfully!" })
   }
}
