export class Error {
  message: string
  statusCode: number

  constructor(message: string, statusCode: number){
    this.message = message
    this.statusCode = statusCode
  }
}
 
// Pedido ruim
export class BadRequest extends Error{
  constructor(message: string){
    super(message, 400)
  }
}

// Não autorizado
export class Unauthorized extends Error{
  constructor(message: string){
    super(message, 401)
  }
}

// Proibido
export class Forbidden extends Error{
  constructor(message: string){
    super(message, 403)
  }
}

// Não encontrado
export class NotFound extends Error{
  constructor(message: string){
    super(message, 404)
  }
}

// Método não permitido
export class MethodNotAllowed extends Error{
  constructor(message: string){
    super(message, 405)
  }
}