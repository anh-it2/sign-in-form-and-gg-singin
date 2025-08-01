"use client";

import  { baseSignInUrl } from "@/config/baseUrl";
import React, { useEffect, useState } from "react";

export default function UserInfo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");

    console.log("Retrieved JWT token:", token);
    if (!token) {
      setError("No JWT token found in localStorage.");
      return;
    }

    const fetchData = async () =>{
      const data = await fetch(`${baseSignInUrl}/internal/details`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    })
      const json = await data.json()
      console.log(json)
    }
    fetchData()

    
  }, []);

  return (
    <div>
      <h2>User Info</h2>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : !error ? (
        <p>Loading...</p>
      ) : null}
    </div>
  );
}