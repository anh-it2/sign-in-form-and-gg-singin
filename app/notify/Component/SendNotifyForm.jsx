'use client'

import { getMessaging } from 'firebase/messaging'
import React, { useEffect, useState } from 'react'
import { app } from '../lib/notify/firebase'

import '../notify.css'
import { baseNotifyUrl } from '../config/baseUrl'
import { generateToken } from '../utils/generateToken'
import isValidEmail from '../utils/isValidEmail'


const SendNotifyForm = ({setSendNotify}) => {

    const [loading, setLoading] = useState(false)

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

    const sendNotify = async (token, e) => {
        
        e.preventDefault()

        setLoading(true)

        console.log(token)
            if(form.email !== '' && form.text !==''){
                if(!isValidEmail(form.email)){
                alert('Invalid email')
                return;
            }
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
                })
            })
            } else{
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
                    })
                })
        }
        setSendNotify((prev) => !prev)
    }

    useEffect(() => {
        const fetchToken = async () =>{
            const t = await generateToken()
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
            <button className='btn-send-notify' disabled={form.title ==='' || form.body ===''}>{loading ? <div className="spinner middle"></div>: <div className='send'>Gửi thông báo</div>}</button>
        </form>
    </div>
  )
}

export default SendNotifyForm