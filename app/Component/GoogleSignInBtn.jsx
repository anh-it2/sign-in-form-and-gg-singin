'use client'
import React from 'react'
import Image from 'next/image'
import { signIn } from 'next-auth/react'
const GoogleSignInBtn = () => {
  return (
        <button onClick={() => signIn('google')} className='flex justify-center mt-4 shadow-lg p-2 wrap-normal w-fit mx-auto cursor-pointer'>
            <Image src='/google-logo.png' width={40} height={40} alt='image'/>
            <span className='my-auto mx-4'>Sign In With Google</span>
        </button>
  )
}

export default GoogleSignInBtn