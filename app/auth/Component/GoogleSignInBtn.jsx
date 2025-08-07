// 'use client'
// import React from 'react'
// import Image from 'next/image'
// import { baseSignInUrl } from '../config/baseUrl'

// const GoogleSignInBtn = () => {
//   return (
//         <button 
//             onClick={() =>{
//               document.cookie = `frontendUrl=${window.location.origin}; path=/`;
//               window.location.href = `${baseSignInUrl}/oauth2/authorization/google`
//             }}
//            className='flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 rounded-lg 
//            shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer'>
//             <Image src='/google-logo.png' height={24} width={24} alt='image'/>
//             <span className='text-sm font-medium text-gray-700'>Sign in with Google</span>
//         </button>
//   )
// }

// export default GoogleSignInBtn

'use client';

import React from 'react';
import Image from 'next/image';
import { baseSignInUrl } from '../config/baseUrl';


const GoogleSignInBtn = () => {
    const handleGoogleLogin = () => {

        console.log("Redirecting to backend Google OAuth");

        // Redirect to backend OAuth2 Google login URL
        window.location.href = `${baseSignInUrl}/oauth2/authorization/google`;
    };

    return (
        <button
            onClick={handleGoogleLogin}
            className='flex items-center justify-center gap-2 px-4 py-2 border border-blue-500 rounded-lg
      shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 w-full cursor-pointer'>
            <Image src='/google-logo.png' height={24} width={24} alt='image'/>
            <span className='text-sm font-medium text-gray-700'>Sign in with Google</span>
        </button>
    );
};

export default GoogleSignInBtn;