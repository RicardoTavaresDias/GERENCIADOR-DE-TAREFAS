import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { Unauthorized } from "@/utils/error";
import { authConfig } from "@/config/auth";

interface Roles {
  role: string,
  sub: string
}

export function authentication(request: Request, response: Response, next: NextFunction){
  try{
    const authentication = request.headers.authorization

    if(!authentication){
      throw new Unauthorized("JWT token not found")
    }

    const token = authentication.split(" ")[1]
    const { secret } = authConfig.jwt
    const { role, sub } = verify(token, secret) as Roles

    request.headers = {
      role: role,
      id: sub
    }
    return next()
  }catch(error){
    throw new Unauthorized("Invalid JWT token")
  }
}