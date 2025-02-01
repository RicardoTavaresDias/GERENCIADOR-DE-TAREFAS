import { Request, Response } from "express";

class SessionUsersController {
   async teste(request: Request, response: Response){
        response.json("Session User OK!")
   }
}

export { SessionUsersController }