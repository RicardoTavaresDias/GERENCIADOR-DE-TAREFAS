export class Error {
  message: string
  statusCode: number

  constructor(message: string, statusCode: number = 400){
    this.message = message
    this.statusCode = statusCode
  }
}