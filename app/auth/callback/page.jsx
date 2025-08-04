'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("jwtToken");

    if (token) {
      localStorage.setItem("jwtToken", token);
      router.replace('/dashboard')
    } else {
      console.error("JWT token not found in URL");
    }
  }, [router]);

  return <div>Processing login...</div>;
};

export default CallbackPage;