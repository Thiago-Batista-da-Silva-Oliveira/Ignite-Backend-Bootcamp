import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import {compare} from 'bcrypt'
import { sign } from "jsonwebtoken";
import { AppError } from "@errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}
    async execute({email, password}:IRequest):Promise<IResponse> {
       const user = await this.usersRepository.findByEmail(email)

       if(!user){
           throw new AppError("Email or password incorret")
       }

       const passwordMatch = await compare(password, user.password)

       if(!passwordMatch) {
        throw new AppError("Email or password incorret")
       }

       const token = sign({}, "fsadasfsa4das65f46as4dsa64", {
           subject: user.id,
           expiresIn: "1d"
       })

       const tokenReturn: IResponse = {
           token,
           user: {
               name: user.name,
               email: user.email
           }
       }

       return tokenReturn
    }
}

export {AuthenticateUserUseCase}