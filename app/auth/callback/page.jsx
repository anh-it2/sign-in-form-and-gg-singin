'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const CallbackPage = () => {
  const router = useRouter();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);

    router.replace("/dashboard");

  }, [router]);

  return <div>Processing login...</div>;
};

export default CallbackPage;