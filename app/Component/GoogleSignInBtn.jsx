'use client'
import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
const GoogleSignInBtn = () => {
  return (
        <button 
            onClick={() =>{signIn('google')}}
            className='flex items-center gap-4 shadow-xl rounded-lg pl-3 cursor-pointer 
            mx-auto mt-4 transition-all duration-400 hover:scale-105
            '>
            <Image src='/google-logo.png' height={30} width={30} alt='image'/>
            <span className='bg-blue-500 text-white px-4 py-3'>Sign in with Google</span>
        </button>
  )
}

export default GoogleSignInBtn