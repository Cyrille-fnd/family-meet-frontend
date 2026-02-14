import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { apiPost } from "@/app/services/apiClient"

export async function POST(request: Request) {
    const body = await request.json()

    const response = await apiPost('/api/v2/login', body)

    if (!response.ok) {
        return NextResponse.json(
            { success: false },
            { status: response.status }
        )
    }

    const { token } = response.data

    if (!token) {
        return NextResponse.json(
            { success: false },
            { status: 401 }
        )
    }

    (await cookies()).set('x-auth-token', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
        maxAge: 86400,
    })

    return NextResponse.json({ success: true })
}
