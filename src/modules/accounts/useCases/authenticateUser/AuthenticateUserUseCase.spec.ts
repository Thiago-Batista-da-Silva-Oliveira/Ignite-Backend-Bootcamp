import { AppError } from "@shared/errors/AppError"
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO"
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"


let authenticateUserUseCase: AuthenticateUserUseCase
let usersRepositoryInMemory: UsersRepositoryInMemory
let createUserUseCase:CreateUserUseCase

describe("It should authenticate user", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory)
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
})
    it("should be able to authenticate an user",async () => {
        const user:ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User",
        }
       await createUserUseCase.execute(user)

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        })

        expect(result).toHaveProperty("token")
    })

    it("should not be able to authenticate an nonexistent user", async () => {
       await expect(
            await authenticateUserUseCase.execute({
                email: 'false@email.com',
                password: '123456'
            })
     ).rejects.toEqual(new AppError("Email or password incorrect"))
    })

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "9999",
            email: "teste@email.com",
            name: "User",
            password: "123456"
        }
        await createUserUseCase.execute(user)
        expect(
          await authenticateUserUseCase.execute({
              email: user.email,
              password: "incorrectPassword"
          })
        ).rejects.toEqual(new AppError("Email or password incorrect"))
    })
})