'use client'
import React from 'react'
import Image from 'next/image'
// import { signIn } from 'next-auth/react'
const FacebookSignInBtn = () => {
  return (
        <button 
            // onClick={() =>{signIn('google')}}
            className='flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 
            rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer'>
            <Image src='/facebook-logo.webp' height={30} width={30} alt='image'/>
            <span className='text-sm font-medium text-blue-700'>Sign in with Facebook</span>
        </button>
  )
}

export default FacebookSignInBtn