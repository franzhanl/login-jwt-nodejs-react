import { prismaClient } from '../../prisma'
import { hash } from 'bcrypt'

interface IUser{
    name: string
    email: string
    password: string
}

class CreateUserService {
    async execute({name, email, password}: IUser){

        const checkUser = prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if (!checkUser) throw new Error('Email already exists')

        const hashPassword = await hash(password, 8)

        try{
            const userCreated = await prismaClient.user.create({
                data: {
                    name: name,
                    email: email,
                    password: hashPassword
                }
            })
    
            return userCreated

        }catch(err){
            throw new Error('Error creating user')
        }
    }
}

export { CreateUserService }