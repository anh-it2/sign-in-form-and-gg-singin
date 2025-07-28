// NotificationCard.jsx
'use client'

import React, { forwardRef } from 'react';
import { LuUser } from 'react-icons/lu';
import { markAsRead } from '../lib/notify/api';
import { useRouter } from 'next/navigation';

const NotificationCard = forwardRef(({ message, setUnReadNotify, onMarkAsRead, router }, ref) => {

  const handleClickNotify = async (id, link, e) =>{

    e.preventDefault()

    console.log(link)
    if(message.read === false){
      setUnReadNotify((count) => count - 1)

      await markAsRead(id)

      onMarkAsRead(id)
    }
    router.push(link)
}

  return (
      <div className={`notificationCard ${message.read ? 'read' : 'unread'}`} ref={ref} onClick={(e) => handleClickNotify(message.id, message.link,e)}>
        <div className='circle'></div>
        {message.image ? <img src={message.image} alt="notification" className='image'/> : <LuUser className='icon-user'/>}
        <div className='infor'>
          <div className="title">{message.title}</div>
          <div className="body">{message.body}</div>
        </div>
      </div>
  );
});

export default NotificationCard;
