import {
    ICreateUserRequest,
    ICreateUserResponse,
    IDeleteUserRequest,
    IDeleteUserResponse,
    IReadUserRequest,
    IReadUserResponse,
    IUpdateUserRequest,
    IUpdateUserResponse,
    IReadAllUsersRequest,
    IReadAllUsersResponse,
} from "../../domain/dtos"
export interface UserUseCase {
    createUser(request: ICreateUserRequest): Promise<ICreateUserResponse>
    readUser(request: IReadUserRequest): Promise<IReadUserResponse>
    readAllUsers(request: IReadAllUsersRequest): Promise<IReadAllUsersResponse>
    updateUser(request: IUpdateUserRequest): Promise<IUpdateUserResponse>
    deleteUser(request: IDeleteUserRequest): Promise<IDeleteUserResponse>
}
