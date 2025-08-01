// export async function fetNotification(lastDoc) {
//      const res = await fetch(`${self.location.origin}/api/notify/fetchNotification`,{
//       method:'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body:JSON.stringify({
//         lastDoc: lastDoc
//       })
//     })

//     return res
// }

// export async function saveNotification(data) {
//     await fetch(`${self.location.origin}/api/notify/saveNotification`,{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json'
//         },
//         body:JSON.stringify({
//           title: data.title,
//           body: data.body,
//           image: data.image
//         })
//       })
// }

// export async function markAsRead(id) {
//     await fetch('api/notify/markAsRead',{
//       method: 'POST',
//       headers:{
//         'Content-Type':'application/json'
//       },
//       body: JSON.stringify({
//         id: id
//       })
//     })
// }

// export async function fetchAll(loading) {
//   if(loading) return 

//   const res = await fetch('https://notify-application-ynxd.onrender.com/notifications?page=0&size=1000')
//   const json = await res.json()
//   const x = json.data.content[0].id
//   setId(x)
//   idRef.current = x
//   return json.data.content
// } 