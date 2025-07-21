'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import GoogleSignInBtn from './GoogleSignInBtn'
const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = async (e) =>{
        e.preventDefault();

        try {
            const res = await signIn('credentials',{
                email,
                password,
                redirect: false
            })

            if(res.error){
                setError('Invalid Credentials')
                return;
            }
            router.replace('dashboard')
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-xl font-bold my-4'>Enter the details</h1>

            <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder='Email' />
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password' />
                <button className='bg-green-600 text-white
                font-bold cursor-pointer px-6 py-2
                '>Login</button>
                {error &&(
                    <div className='bg-red-500 text-white w-fit py-1 px-3 rounded-md'>{error}</div>
                )}
                <Link href='register' className='text-sm mt-3 text-right'>
                    Don't have an account? <span className='underline'>Register</span>
                </Link>
            </form>
            <GoogleSignInBtn />
        </div>
    </div>
  )
}

export default LoginForm