'use client'

import { getMessaging } from 'firebase/messaging'
import React, { useEffect, useState } from 'react'
import { app } from '../lib/notify/firebase'
import { generateToken } from './NotifyComponent'

const SendNotifyForm = () => {

    const [form, setForm] = useState({
        title: '',
        body: '',
        imageUrl:'',
        deviceToken: '',
        customField: '',
    })
    const [token, setToken] = useState('')

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const sendNotify = async (token, e) => {
        
        e.preventDefault()
        await fetch('https://notify-app-cj9d.onrender.com/notifications/send-to-device',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                title: form.title,
                body: form.body,
                imageUrl: form.imageUrl,
                deviceToken: token
            })
        })
    }

    useEffect(() => {
        const fetchToken = async () =>{
            const messaging = getMessaging(app)
            const t = generateToken(messaging)
            setToken(t)
        }

        fetchToken()
    },[])

  return (
    <div className='send-notify'>   
        <form>
            <div className='form-title'>Send notify</div>
            <input name='title' placeholder='Tiêu đề' value={form.title} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='body' placeholder='Nội dung' value={form.body} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='imageUrl' placeholder='Đường dẫn ảnh' value={form.imageUrl} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <input name='customField' placeholder='customField' value={form.customField} onChange={handleChange} className='input-sendNotify-form'/> <br />
            <button onClick={(e) => sendNotify(token, e)} className='btn-send-notify'>Gửi thông báo</button>
        </form>
    </div>
  )
}

export default SendNotifyForm