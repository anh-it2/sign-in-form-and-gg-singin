'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import '../auth.css'
import {  useRouter } from 'next/navigation'
import GoogleSignInBtn from './GoogleSignInBtn'
import FacebookSignInBtn from './FacebookSignInBtn'
const LoginForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-2xl font-semibold text-center text-gray-800 mb-6'>
                Welcome Back <br></br>
                <span className='text-green-600'>Login to your account</span>
                </h1>

            <form className='flex flex-col gap-3' >
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder='Email' />
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password' />
                <button className='bg-green-600 text-white
                font-bold cursor-pointer px-6 py-2 hover:bg-green-700 transition-all duration-300 rounded-lg
                '>Login</button>
                {error &&(
                    <div className='bg-red-500 text-white w-fit py-1 px-3 rounded-md'>{error}</div>
                )}
                <div className='mt-6 text-center text-sm text-gray-600'>
                    Don't have an account?{' '}
                    <Link href='register' className='text-sm mt-3 text-right '>
                        <span className='text-indigo-600 font-medium hover:underline hover:text-indigo-400
                        transition-colors duration-200
                        '>Register</span>
                    </Link>
                </div>
            </form>
            <div className='flex gap-4 mt-6'>
                <GoogleSignInBtn />
                <FacebookSignInBtn />
            </div>
        </div>
    </div>
  )
}

export default LoginForm