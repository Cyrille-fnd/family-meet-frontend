import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { apiPost } from "@/app/services/apiClient"

export async function POST(request: Request) {
    const body = await request.json()

    const registerResponse = await apiPost('/api/v2/users', body)

    if (registerResponse.status !== 201) {
        return NextResponse.json(
            { success: false },
            { status: registerResponse.status }
        )
    }

    const loginResponse = await apiPost('/api/v2/login', {
        username: body.email,
        password: body.password,
    })

    if (!loginResponse.ok) {
        return NextResponse.json(
            { success: false },
            { status: loginResponse.status }
        )
    }

    const { token } = loginResponse.data

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
