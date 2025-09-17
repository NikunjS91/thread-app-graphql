import {createHmac,randomBytes} from "node:crypto"
import { prismaClient } from "../lib/db.js"
import JWT from "jsonwebtoken"

const JWT_Secret= '$uperM@n@123';

export interface createPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}


export interface GetUserTokenPayload{
    email: string;
    password: string;
}
class UserService{
    private static generateHash(salt: string,password: string)
    {
        const hashedPassword = createHmac("sha256",salt).update(password).digest('hex')
        return hashedPassword
    }

    public static createUser(payload:createPayload){
        const{firstName,lastName,email,password}=payload
        const salt= randomBytes(32).toString('hex');
       const hashedPassword= UserService.generateHash(salt,password);
        return prismaClient.user.create({
            data:{
                firstName,
                lastName: lastName ?? null, 
                email,
                salt,
                password:hashedPassword
            },
        });
    }

    private static getUser(email:string){
        return prismaClient.user.findUnique({where:{email}})
    }

    public static async getUserToken(payload: GetUserTokenPayload){
        const {email,password}= payload;
        const user =await UserService.getUser(email)
        if(!user) throw new Error('user not found')
    
            const usersalt=user.salt;
            const userHashPassword= UserService.generateHash(usersalt,password)

            if(userHashPassword !== user.password)
                throw new Error("incorrect passoword")

            //generate token
            const token = JWT.sign({id:user.id,email:user.email},JWT_Secret);
            return token;
        }


}

export default UserService;