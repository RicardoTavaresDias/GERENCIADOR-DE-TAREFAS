import { Request, Response, NextFunction } from "express"
import { Error } from "@/utils/error"
import { ZodError } from "zod"

export function APIError(error: any, request: Request, respose: Response, next: NextFunction) {
  if(error instanceof Error){
    return respose.status(error.statusCode).json({ message: error.message })
  }

  if(error instanceof ZodError){
    return respose.status(400).json({ message: error.issues[0].path + " - " + error.issues[0].message })
  }

  return respose.status(500).json({ message: error.message })
}