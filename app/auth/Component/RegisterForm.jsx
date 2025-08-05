'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import '../auth.css'
const RegisterForm = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const router = useRouter()

  return (
    <div className='grid place-items-center h-screen'>
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-green-400'>
            <h1 className='text-2xl font-bold text-center text-green-600 mb-6 tracking-wide'>Register</h1>

            <form className='flex flex-col gap-3' >
                <input onChange={(e) => {setName(e.target.value)}} type="text" placeholder='Full Name' />
                <input onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder='Email' />
                <input onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder='Password' />
                <button className='bg-green-600 text-white
                font-bold cursor-pointer px-6 py-2 hover:bg-green-700 transition-all duration-400 rounded-lg
                ' type='submit'>Register</button>
                {
                    error &&(
                        <div className='bg-red-500 text-white w-fit py-1 px-3 rounded-md'>{error}</div>
                    )
                }
                <div className='mt-6 text-center text-sm text-gray-600'>
                    Already have an account?{' '}
                    <Link href='/' className='text-sm mt-3 text-right '>
                        <span className='text-indigo-600 font-medium hover:underline hover:text-indigo-400
                        transition-colors duration-200
                        '>Login</span>
                    </Link>
                </div>
            </form>
        </div>
    </div>
  )
}

export default RegisterForm