export async function fetNotification(lastDoc) {
     const res = await fetch(`${self.location.origin}/api/notify/fetchNotification`,{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        lastDoc: lastDoc
      })
    })

    return res
}

export async function saveNotification(data) {
    await fetch(`${self.location.origin}/api/notify/saveNotification`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          title: data.title,
          body: data.body,
          image: data.image
        })
      })
}

export async function markAsRead(id) {
    await fetch('api/notify/markAsRead',{
      method: 'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify({
        id: id
      })
    })
}