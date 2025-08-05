'use client'

import { getMessaging } from 'firebase/messaging'
import React, { useEffect, useState } from 'react'
import { app } from '../lib/notify/firebase'
import { generateToken } from './NotifyComponent'
import '../notify.css'
import { baseNotifyUrl } from '../config/baseUrl'


const SendNotifyForm = ({setSendNotify}) => {

    const [form, setForm] = useState({
        title: '',
        body: '',
        imageUrl:'',
        deviceToken: '',
        email: '',
        text:''
    })
    const [token, setToken] = useState('')

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const isValidEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email.trim())) return false
        else return true
    }

    const sendNotify = async (token, e) => {
        
        e.preventDefault()

        console.log(token)
            console.log('trươc khi vào điều kiện')
            if(form.email !== '' && form.text !==''){
                console.log('điều kiện có email và text')
                if(!isValidEmail(form.email)){
                alert('Invalid email')
                return;
            }
                console.log(token)
                const res = await fetch(`${baseNotifyUrl}/notifications/send-to-device-with-email?email=${form.email}`,{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    title: form.title,
                    body: form.body,
                    imageUrl: form.imageUrl,
                    deviceToken: token,
                    text: form.text
                    // sentAt: new Date().toISOString()
                })
            })
            } else{
                console.log(token)
                await fetch('https://notify-application-ynxd.onrender.com/notifications/send-to-device',{
                    method:'POST',
                    headers:{
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({
                        title: form.title,
                        body: form.body,
                        imageUrl: form.imageUrl,
                        deviceToken: token
                        // sentAt: new Date().toISOString()
                    })
                })
        }
        setSendNotify((prev) => !prev)
    }

    useEffect(() => {
        const fetchToken = async () =>{
            const messaging = getMessaging(app)
            const t = await generateToken(messaging)
            console.log(t)
            setToken(t)
        }
        fetchToken()
    },[])
  return (
    <div className='send-notify'>   
        <form onSubmit={(e) => sendNotify(token, e)}>
            <div className='form-title'>Send notify</div>
            <input name='title' placeholder='Tiêu đề' value={form.title} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='body' placeholder='Nội dung' value={form.body} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='imageUrl' placeholder='Đường dẫn ảnh' value={form.imageUrl} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='email' placeholder='email' value={form.email} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='text' placeholder='text' value={form.text} onChange={handleChange} className='input-sendNotify-form' /> <br />
            <button className='btn-send-notify' disabled={!token}>Gửi thông báo</button>
        </form>
    </div>
  )
}

export default SendNotifyForm