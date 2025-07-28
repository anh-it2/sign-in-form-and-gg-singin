'use client'


import{getMessaging, getToken, onMessage} from 'firebase/messaging'
import { useCallback, useEffect, useRef, useState } from "react";
import NotificationList from "./NotificationList";
import { collection, onSnapshot } from "firebase/firestore";
import { MdNotificationsActive } from "react-icons/md";
import '../notify.css'
import { fetNotification, saveNotification } from '../lib/notify/api';
import { db,app } from '../lib/notify/firebase';
import { useRouter } from 'next/navigation';


export default function Home() {

  const observer = useRef()
  const scrollContainer = useRef()
  const countRef = useRef(-1)
  const router = useRouter()

  const [notify, setNotify] = useState([])
  const [lastDoc, setLastDoc] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [show, setShow] = useState(false)
  const [unReadNotify, setUnReadNotify] = useState(0)

  const fetchData = async (lastDoc) => {

    if(!hasMore || loading) return 

    setLoading(true)

    // const params = new URLSearchParams({
    //   page: 1,
    //   size: 10,
    //   sortBy: 'createdAt',
    //   sortDirection: 'DESC'
    // }).toString()

    // console.log(params)
    // const res = await fetch(`https://notify-app-cj9d.onrender.com/notifications?${params}`)

    const res = await fetNotification(lastDoc)
    const json = await res.json()
    const data = json.data
    console.log(json)

    if(!json.hasMore){
      setHasMore(false)
    }else{
      setLastDoc(json.lastDoc)
    }
    if(lastDoc === null){
       setNotify(data)
    }else{
       setNotify((prev) => [...prev,...data])
    }

    setUnReadNotify(json.unReadNoti)

    console.log(notify)
    setLoading(false)
  }

  useEffect(() => {
    // fetchData(null)
    const unSubcribe = onSnapshot(collection(db,'notifications'),async (snapshot) => {
      // setLastDoc(null)
      // setHasMore(true)
      const newCount = snapshot.size;
      if(newCount !== countRef.current ){

        countRef.current = newCount
        await fetchData(null)
      }
    })
    return () => unSubcribe()
  },[])

  useEffect(() => {
    const messaging = getMessaging(app)

    generateToken(messaging)
    onMessage(messaging,async (payload) => {
      console.log(payload)

      const {title, body} = payload.notification
      const image = payload.notification.image ?? null

      const data = {title, body, image}

      saveNotification(data)

      // setNotify((prev) => [data, ...prev])

    })
    },[])

//     useEffect(() => {
//   // Khi mở web do click từ thông báo (từ background hoặc web bị tắt)
//   const handleRouteChange = (url) => {
//     const params = new URLSearchParams(window.location.search);
//     const title = params.get("notify-title");
//     const body = params.get("notify-body");
//     const image = params.get("notify-image");

//     if (title && body) {
//       const data = { title, body, image };
//       console.log(data);
//       saveNotification(data);
//       setNotify((prev) => [data, ...prev]);
//       router.replace("/", undefined, { shallow: true });
//     }
//   };

//   if (router && router.events && typeof router.events.on === "function") {
//     router.events.on("routeChangeComplete", handleRouteChange);
//   }

//   return () => {
//     if (router && router.events && typeof router.events.off === "function") {
//       router.events.off("routeChangeComplete", handleRouteChange);
//     }
//   };
// }, [router]);

    const lastNotifyRef = useCallback(node => {
      if(loading || !node ||!(node instanceof Element)) return 
      if(observer.current) observer.current.disconnect()

      observer.current = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && hasMore){
          fetchData(lastDoc)
        }
      },{
        root: scrollContainer.current,
        rootMargin: '0px',
        threshold: 1.0
      })

      observer.current.observe(node)
    },[loading, hasMore, lastDoc])

  return (
    <>
      <button onClick={() => setShow(!show)} className="notify-btn">
        <div className="icon-wrapper">
          <MdNotificationsActive className="icon"/>
          {!show && <span className="badge ">{unReadNotify > 99? '99+' : unReadNotify}</span>}
        </div>
        {show && notify.length === 0 && <div className="spinner end"></div>}
      </button>

      {show && notify.length > 0 && <NotificationList notify={notify} setNotify={setNotify} router={router}
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

      // await fetch(`https://notify-app-cj9d.onrender.com/notifications/device`,{
      //   method:'POST',
      //   headers:{
      //     'Content-Type':'application/json'
      //   },
      //   body: JSON.stringify({
      //     deviceToken: token
      //   })
      // })
    }
  }
