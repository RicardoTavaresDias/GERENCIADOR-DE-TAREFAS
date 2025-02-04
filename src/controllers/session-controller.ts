import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { z } from "zod"
import { compare } from "bcrypt";
import { MethodNotAllowed, NotFound } from "@/utils/error";
import { sign } from "jsonwebtoken"
import { authConfig } from "@/config/auth";

const prisma = new PrismaClient()

export class SessionController {
  async create(request: Request, response: Response){
    const sessionSchema = z.object({
      email: z.string().email(),
      password: z.string()
    })

    const { email, password } = sessionSchema.parse(request.body)

    const sessionUser = await prisma.users.findFirst({
      where: { email }
    })

    if(!sessionUser){
      throw new NotFound(email + " not registered, please register")
    }
    
    const password_hash = await compare(password, sessionUser.password)

    if(!password_hash){
      throw new MethodNotAllowed("incorrect username and password")
    }
    
    const { expiresIn, secret } = authConfig.jwt
    const token = sign({ role: sessionUser.role }, secret, { expiresIn, subject: sessionUser.id })

    return response.status(200).json(
      { 
        message: "Session initial!", 
        token: token, 
        role: sessionUser.role,
        id: sessionUser.id
      })
  }
}