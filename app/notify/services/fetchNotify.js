import { baseNotifyUrl } from "../config/baseUrl"

export async function fetchNotify(pages, token){

    const params = new URLSearchParams({
        page: pages,
        size: 10,
        sortBy: 'sentAt',
        sortDirection: 'DESC'
    }).toString()

    const res = await fetch(`${baseNotifyUrl}/notifications/device/${token}?${params}`)
    const json = await res.json()
    return json.data.content
}

export async function fetchNumberUnreadNotify(token) {
    const res = await fetch(`${baseNotifyUrl}/notifications/count/unread/${token}`)
    const json = await res.json()
    return json.data
}