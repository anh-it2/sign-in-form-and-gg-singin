'use client'

import React, { forwardRef, useState } from 'react';
import { LuUser } from 'react-icons/lu';
import qs from 'qs'
import { useRouter } from 'next/navigation';
import { isValidHttpUrl } from '../utils/isValidHttpUrl';

const NotificationCard = forwardRef(({ message, setUnReadNotify, onMarkAsRead}, ref) => {

  const [imageError, setImageError] = useState(false)
  const router = useRouter()

  const handleClickNotify = async(id, e) =>{
    e.preventDefault()

    if(message.seen === false){
      setUnReadNotify((prev) => prev - 1)
      await fetch(`https://notify-application-ynxd.onrender.com/notifications/seen/${id}`,{
        method: 'PUT',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          seen: true
        })
      })
      onMarkAsRead(id)
    }

    const query = qs.stringify({
      title: message.title,
      body: message.body,
      imageUrl: message.imageUrl,
      sentAt: message.sentAt
    },{encode:true})

    const link = `/tasks/${id}?${query}`
    router.push(link)
  }

const showImage = isValidHttpUrl(message.imageUrl) && !imageError;

  return (
      <div className={`notificationCard ${message.seen ? 'read' : 'unread'}`} ref={ref} onClick={(e) => handleClickNotify(message.id, e)}>
        <div className='circle'></div>
        {showImage ? (
        <img
          src={message.imageUrl}
          alt="notification"
          className='image'
          onError={() => setImageError(true)}
        />
      ) : (
        <LuUser className='icon-user' />
      )}
        <div className='infor'>
          <div className="title">{message.title}</div>
          <div className="body">{message.body}</div>
        </div>
      </div>
  );
});

export default NotificationCard;
