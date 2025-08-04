"use client";

import  { baseSignInUrl } from "@/config/baseUrl";
import React, { useEffect, useState } from "react";
import SendNotifyForm from "../notify/Component/SendNotifyForm";

export default function UserInfo() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sendNotify, setSendNotify] = useState(false)

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
      setData(json)
    }
    fetchData()
    
  }, []);

  return (
    <>
      {!sendNotify? <div className="home">
        <div className="user-infor">
          <div className="form-user-title">
            <h2 className="user-infor-title">User Info</h2>
            <button className="log-out">Log Out</button>
          </div>
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {data ? (
            <div className="user-infor-details">
              <p className="user-name"><span>Email:</span> {data.email}</p>
              <p className="user-email"><span>Name:</span> {data.name}</p>
            </div>
          ) : !error ? (
            <p className="loading"></p>
          ) : null}
          <button onClick={() =>{setSendNotify((prev) => !prev)}} className="send-notify-btn">Send notify to someone</button>
        </div>
      </div>
      :
      <SendNotifyForm setSendNotify={setSendNotify}/>
      }
    </>
  );
}