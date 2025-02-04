import { Request, Response, NextFunction } from "express"
import { Unauthorized } from "@/utils/error"

export function checkMember(value: string[]){
  return (request: Request, response: Response, next: NextFunction) => {
    if(!request.headers){
      throw new Unauthorized("Unauthorized")
    }

    if(!value.includes(request.headers.role as string)){
      throw new Unauthorized("Unauthorized")
    }
    return next()
  }
}