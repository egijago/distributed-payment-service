import {
    ICreateUserRequest,
    ICreateUserResponse,
    IDeleteUserRequest,
    IDeleteUserResponse,
    IReadAllUsersResponse,
    IReadUserRequest,
    IReadUserResponse,
    IUpdateUserRequest,
    IUpdateUserResponse,
} from "../../domain/dtos"
import { IUserRepository } from "../repositories/user-repository"
import { User } from "../../domain/entities/user"
import { IReadAllUsersRequest } from "../../domain/dtos/read-all-users-request"
import { UserUseCase } from "./user-use-case"

export class UserUseCaseImpl implements UserUseCase {
    constructor(private repository: IUserRepository) {}

    async createUser(
        request: ICreateUserRequest,
    ): Promise<ICreateUserResponse> {
        const user = await this.repository.create({
            username: request.username,
            password: request.password,
            balance: request.balance,
        })

        return { user }
    }

    async readUser(request: IReadUserRequest): Promise<IReadUserResponse> {
        const user = await this.repository.read(request.id)

        return { user }
    }

    async readAllUsers(request: IReadAllUsersRequest): Promise<IReadAllUsersResponse> {
        const users = await this.repository.readAll()

        return { users }
    }

    async updateUser(
        request: IUpdateUserRequest,
    ): Promise<IUpdateUserResponse> {
        const user = await this.repository.update({
            id: request.id,
            username: request.username,
            password: request.password,
            balance: request.balance,
        })

        return { user }
    }

    async deleteUser(request: IDeleteUserRequest): Promise<IDeleteUserResponse> {
        const user = await this.repository.delete(request.id)

        return { user }
    }
}
