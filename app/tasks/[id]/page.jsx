'use client'

import NotifyComponent from'../../notify/Component/NotifyComponent'
import dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import './tasks.css'
import { LuUser } from 'react-icons/lu'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'

dayjs.extend(relativeTime )

const page = ({params}) => {

  const data = useSearchParams()
  const title = data.get('title')
  const body = data.get('body')
  const imageUrl = data.get('imageUrl')
  const sentAt = data.get('sentAt')

  
  function getTimeAgo(dateStr) {
    const decoded = decodeURIComponent(dateStr); 
    const past = new Date(decoded);
    const now = new Date();
    const diffMs = now - past;

    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);

    if (days > 0) return `${days} ngày trước`;
    if (hours > 0) return `${hours} giờ trước`;
    if (minutes > 0) return `${minutes} phút trước`;
    return `Vừa đăng xong`;
  }
  const timeAgo = getTimeAgo(sentAt)

  function isValidHttpUrl(str) {
  try {
    const url = new URL(imageUrl);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch (_) {
    return false;
  }
}
const showImage = isValidHttpUrl(imageUrl)

  return (
    <div>
      <Link href={'/dashboard'}>Home</Link>
      <div className='task-container'>
        <div className='task'>
          <div className='task-infor'>
            {showImage && imageUrl?<img src={imageUrl} className='image-user'/>:<LuUser className='icon-user'/>}
            <div className='title-infor'>
              <div className='title'>{title}</div>
              <div className='time-ago'>{timeAgo}</div>
            </div>
          </div>
          <div className='task-details'>{body}</div>
        </div>
      </div>

    </div>
  )
}

export default page

