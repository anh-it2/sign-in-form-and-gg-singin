'use client'


import{getMessaging, getToken, onMessage} from 'firebase/messaging'
import { useCallback, useEffect, useRef, useState } from "react";
import NotificationList from "./NotificationList";
import { MdNotificationsActive } from "react-icons/md";
import '../notify.css'
import { app } from '../lib/notify/firebase';
import { baseNotifyUrl } from '@/config/baseUrl';


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
    const [id, setId] = useState(0)

    const fetchData = async (token) => {

      if(!hasMore || loading) return 

      setLoading(true)

        const params = new URLSearchParams({
          page: pages,
          size: 10,
          sortBy: 'sentAt',
          sortDirection: 'DESC'
        }).toString()
  
        const  res = await fetch(`${baseNotifyUrl}/notifications/device/${token}?${params}`)
        const json = await res.json()
        const data = json.data.content
        if(data.length < 10){
          setHasMore(false)
        }
        return data
    }

    const fetchAll = async (token) =>{
      if(loading) return

      const res = await fetch(`${baseNotifyUrl}/notifications/device/${token}?page=0&size=1000`)
      const json = await res.json()
      if(json.length !== 0) {

        try {
          const filtered = json.data.content.filter(item => item.sentAt !== null)

          if(filtered.length > 0){
          const x = json.data.content[0].id
          setId(x)
          idRef.current = x
        }
        return filtered
        } catch (error) {
          alert("error" + error.message)
        }
      }
    }

    useEffect(() => {
      const unRead = async () => {

        const messaging = getMessaging(app)
        const token = await generateToken(messaging)

        const data = await fetchAll(token)
        console.log(data)

        let x = 0
        data.map((item) => {
        if(item.seen === false) x++
      })
      setUnReadNotify(x)
      }
      unRead()
    },[])

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

    useEffect(() =>{

      const messaging = getMessaging(app)

      const fetch = async ()=>{

        if(loading || !hasMore) return
        setLoading(true)

        const token = await generateToken(messaging)
        const data = await fetchData(token)
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

      const lastNotifyRef = useCallback(node => {
        if(loading || !node ||!(node instanceof Element)) return 
        if(observer.current) observer.current.disconnect()

        observer.current = new IntersectionObserver((entries) => {
          console.log(entries)
          if(entries[0].isIntersecting && hasMore){
            setPages((pages) => pages + 1)
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

  export const generateToken = async (messaging) => {
      const permission = await Notification.requestPermission()

      if(permission ==="granted"){
        const token = await getToken(messaging,{
          vapidKey:process.env.NEXT_PUBLIC_FIREBASE_VAPIDKEY
        })
        console.log(token)
        return token
      }
    }
