
import { db } from "@/app/notify/lib/notify/firebase"
import { collection, doc, setDoc, Timestamp } from "firebase/firestore"
import { NextResponse } from "next/server"

export async function POST(req) {
    const request = await req.json()

    const collectionRef = collection(db,'notifications')
    const docRef = doc(collectionRef)

    await setDoc(docRef,{
        id: docRef.id,
        title: request.title,
        body: request.body,
        image: request.image ?? null,
        link: `/tasks/${docRef.id}`,
        read: false,
        createdAt: Timestamp.now()
    })

    return NextResponse.json('success')
}