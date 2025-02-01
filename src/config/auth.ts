import { env } from "../env"

export const authConfig = {
    jwt: {
        secret: env.JWT_SECRET,
        //expiresIn: "15s"
        expiresIn: "1d"
    }
}