'use client'
import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
const GoogleSignInBtn = () => {
  return (
        <button 
            onClick={() =>{
              window.location.href = 'https://eb965a1fc053.ngrok-free.app/oauth2/authorization/google'
            }}
           className='flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 rounded-lg 
           shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer'>
            <Image src='/google-logo.png' height={24} width={24} alt='image'/>
            <span className='text-sm font-medium text-gray-700'>Sign in with Google</span>
        </button>
  )
}

export default GoogleSignInBtn