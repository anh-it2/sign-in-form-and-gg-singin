import { db } from "@/app/notify/lib/notify/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    
    const taskId = params.id
    const task = '/tasks/' + taskId

    let q = query(
        collection(db,'notifications'),
        where('link','==', task)
    )

    const snapshot = await getDocs(q)
    const docRef = snapshot.docs[0].data()


    return NextResponse.json({
        title: docRef.title,
        body: docRef.body,
        image: docRef.image,
        createdAt: docRef.createdAt
    })
}