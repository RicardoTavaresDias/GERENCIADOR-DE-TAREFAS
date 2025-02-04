import { Request, Response } from "express";
import { Error } from "@/utils/error";

export class SessionUsersController {
   async teste(request: Request, response: Response){
      throw new Error("Tratamento de Error!", 500)
      return  response.json("Request em funcionamento no controller!")
   }
}
