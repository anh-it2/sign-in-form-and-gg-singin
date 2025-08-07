'use client'

import{getMessaging, onMessage} from 'firebase/messaging'
import { useCallback, useEffect, useRef, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import '../notify.css'
import { app } from '../lib/notify/firebase';
import dynamic from 'next/dynamic';
import { generateToken } from '../utils/generateToken';
import { fetchNotify, fetchNumberUnreadNotify } from '../services/fetchNotify';

const NotificationList = dynamic(() => import('./NotificationList'))

  export default function Home() {

    const observer = useRef()
    const scrollContainer = useRef()
    const idRef = useRef(0)
    const [notify, setNotify] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)
    const [show, setShow] = useState(false)
    const [unReadNotify, setUnReadNotify] = useState(0)
    const [pages, setPages] = useState(0)
    const hasSetId = useRef(false)

    useEffect(() => {
    
    const channel = new BroadcastChannel('notification_broadcast_channel');
    channel.onmessage = (event) => {
      const {title, body} = event.data.notification
      const imageUrl = event.data.notification.image
      const seen = false
      const data = {title, body, imageUrl, seen}
      data.id = idRef.current + 1
      setNotify((prev) => [data, ...prev])
      setUnReadNotify((prev) => prev + 1)
    };
  return () => {channel.close()}
}, []);

    useEffect(() => {

      const messaging = getMessaging(app)
      const unsubcribe = onMessage(messaging,async (payload) => {

        const {title, body} = payload.notification
        const imageUrl = payload.notification.image
        const seen = false
        const data = {title, body, imageUrl, seen}
        data.id = idRef.current + 1
        setNotify((prev) => [data,...prev])
        setUnReadNotify((prev) => prev + 1)
      })
      return () => unsubcribe()
      },[])

    useEffect(() =>{

      const fetch = async ()=>{

        if(loading || !hasMore) return
        setLoading(true)

        const token = await generateToken()

        const unRead = await fetchNumberUnreadNotify(token)
        setUnReadNotify(unRead)

        const data = await fetchNotify(pages, token)

        if(!hasSetId.current && data.length > 0){
          hasSetId.current = true
          idRef.current = data[0].id
        }

        if(data.length < 10){
          setHasMore(false)
        }
         
        const mapped = data
        .map((item) => ({
          title: item.title,
          body: item.body,
          imageUrl: item.imageUrl,
          sentAt: item.sentAt,
          seen: item.seen,
          id: item.id
        }))
        setNotify((prev) => {
          const existingIds = new Set(prev.map(item => item.id));
          const uniqueNew = mapped.filter(item => !existingIds.has(item.id));
          return [...prev, ...uniqueNew];
        });
        setLoading(false)
      }
      fetch()
    },[pages])

      const lastNotifyRef = useCallback(node => {
        if(loading || !node ||!(node instanceof Element)) return 
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
          if(entries[0].isIntersecting && hasMore){
            setPages(pages + 1)
          }
        },{
          root: scrollContainer.current,
          rootMargin: '0px',
          threshold: 1.0
        })

        observer.current.observe(node)
      },[loading, hasMore])

    return (
      <>
        <button onClick={() => setShow(!show)} className="notify-btn">
          <div className="icon-wrapper">
            <MdNotificationsActive className="icon"/>
            {!show && unReadNotify >0 && <span className="badge ">{unReadNotify > 99? '99+' : unReadNotify}</span>}
          </div>
          {show && notify.length === 0 && <div className="spinner end"></div>}
        </button>

        {show && notify.length > 0 && <NotificationList notify={notify} setNotify={setNotify}
        lastNotifyRef={lastNotifyRef} ref={scrollContainer} setUnReadNotify={setUnReadNotify} loading={loading}/>}
      </>
    );
  }

