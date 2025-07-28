
import NotifyComponent from'../../notify/Component/NotifyComponent'
import dayjs from 'dayjs'
import relativeTime  from 'dayjs/plugin/relativeTime'
import './tasks.css'
import { LuUser } from 'react-icons/lu'
import Link from 'next/link'

dayjs.extend(relativeTime )

const page = async({params}) => {

  const res = await fetch(`http://localhost:3000/api/notify/findTaskById/${params.id}`)
  const data = await res.json()
  
  const createdAt = data.createdAt
  const date = new Date(createdAt.seconds * 1000)

  const timeAgo = dayjs(date).fromNow()

  return (
    <div>
      <Link href={'/'}>Home</Link>
      <NotifyComponent />
      <div className='task-container'>
        <div className='task'>
          <div className='task-infor'>
            {data.image?<img src={data.image} className='image-user'/>:<LuUser className='icon-user'/>}
            <div className='title-infor'>
              <div className='title'>{data.title}</div>
              <div className='time-ago'>{timeAgo}</div>
            </div>
          </div>
          <div className='task-details'>{data.body}</div>
        </div>
      </div>

    </div>
  )
}

export default page

