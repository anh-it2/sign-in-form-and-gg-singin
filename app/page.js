'use client'
import { useEffect } from "react";
import LoginForm from "./Component/LoginForm";

import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter()

  useEffect(() =>{
    const token = localStorage.getItem('jwtToken')

    if(isTokenValid(token)){
      router.push('/dashboard')
    }
  },[])

  const isTokenValid = (token) => {
    if(!token) return false

    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const now = Math.floor(Date.now() / 1000)
      return payload.exp && payload.exp > now
    } catch (error) {
      return false
    }
  }

  return (
    <main>
      {/* <NotifyComponent />
      <SendNotifyForm /> */}
      <LoginForm />
    </main>
  );
}
