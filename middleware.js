import { NextResponse } from "next/server"

export default function middleware(req){
    const jwtToken = req.cookies.get('jwtToken')?.value;
    if(!jwtToken){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher:[
        '/dashboard',
        '/tasks/:path*'
    ]
}