'use client'

import { getMessaging, getToken } from "firebase/messaging"
import { app } from "../lib/notify/firebase"

export async function generateToken(){

    const messaging = getMessaging(app)

    const permission = await Notification.requestPermission()
    if(permission ==='granted'){
        const token = await getToken(messaging,{
            vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY
        })
        console.log(token)
        return token
    }
    else {
        alert('Not have permission to notify')
    }
}