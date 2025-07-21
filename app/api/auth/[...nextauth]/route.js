import { connectMongoDB } from "@/lib/mongodb";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs'
import User from "@/models/user";
import GoogleProvider from 'next-auth/providers/google'

export const authOptions = {
    providers:[
        CredentialsProvider({
            name:'credentials',
            credentials:{},
            //return value for client
            async authorize(credentials){
                const {email, password} = credentials
                try {
                    await connectMongoDB()
                    const user =  await User.findOne({email})
                    if(!user){
                        return null
                    }

                    const passwordMatch = await bcrypt.compare(password, user.password)

                    if(!passwordMatch){
                        return null
                    }

                    return user
                } catch (error) {
                    console.log('Error:', error)
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    session:{
        strategy: 'jwt'
    },
    secret:process.env.NEXTAUTH_SECRET,//xác thực jwt
    pages:{
        signIn:'/'
    }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}