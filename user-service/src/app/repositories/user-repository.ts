import { User } from "../../domain/entities/user"

export interface IUserRepository {
    create({
        username,
        password,
        balance,
    }: {
        username: string
        password: string
        balance: number
    }): Promise<User>
    read(id: number): Promise<User>
    readAll(): Promise<User[]>
    update({
        id,
        username,
        password,
        balance,
    }: {
        id: number
        username: string
        password: string
        balance: number
    }): Promise<User>
    delete(id: number): Promise<User>
}
