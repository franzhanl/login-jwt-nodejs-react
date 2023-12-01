import { prismaClient } from '../../prisma'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

interface IUser{
    email: string
    password: string
}

class AuthUserService {
    async execute({email, password}: IUser){
        const user = await prismaClient.user.findFirst({
            where: {
                email: email
            }
        })

        if(!user) throw new Error('email/password incorrect')

        const checkPassword = await compare(password, user.password) 

        if (!checkPassword) throw new Error('email/password incorrect')

        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            //@ts-expect-error variavel de ambiente
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
            
        )

        return {
            name: user.name,
            email: user.email,
            token: token
        }
    }
}

export { AuthUserService }