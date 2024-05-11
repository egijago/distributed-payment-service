import { PrismaClient } from "@prisma/client"
import { User } from "../../domain/entities/user"
import { IUserRepository } from "./user-repository"

export class UserRepositoryImpl implements IUserRepository {
    constructor(private prisma: PrismaClient) {}

    async create(user: User): Promise<User> {
        const _user = await this.prisma.user.create({
            data: {
                username: user.username,
                password: user.password,
                balance: user.balance,
            },
        })

        return {
            id: _user.id,
            username: _user.username,
            password: _user.password,
            balance: Number(_user.balance),
        }
    }

    async read(id: number): Promise<User> {
        const _user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        })

        if (!_user) {
            throw new Error("User not found")
        }

        return {
            id: _user.id,
            username: _user.username,
            password: _user.password,
            balance: Number(_user.balance),
        }
    }

    async readAll(): Promise<User[]> {
        const _users = await this.prisma.user.findMany()
        return _users.map((user: any) => {
            return {
                id: user.id,
                username: user.username,
                password: user.password,
                balance: Number(user.balance),
            }
        })
    }

    async update(user: User): Promise<User> {
        const _user = await this.prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                username: user.username,
                password: user.password,
                balance: user.balance,
            },
        })

        return {
            id: _user.id,
            username: _user.username,
            password: _user.password,
            balance: Number(_user.balance),
        }
    }

    async delete(id: number): Promise<User> {
        const _user = await this.prisma.user.delete({
            where: {
                id: id,
            },
        })

        return {
            id: _user.id,
            username: _user.username,
            password: _user.password,
            balance: Number(_user.balance),
        }
    }
}
