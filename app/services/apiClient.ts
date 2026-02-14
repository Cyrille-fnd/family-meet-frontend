const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

interface ApiResponse {
    status: number
    ok: boolean
    data: any
}

export async function apiGet(path: string, token?: string): Promise<ApiResponse> {
    const headers: Record<string, string> = {}
    if (token) {
        headers['Authorization'] = 'bearer ' + token
    }

    const response = await fetch(API_BASE_URL + path, { headers })

    const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : null

    return {
        status: response.status,
        ok: response.ok,
        data,
    }
}

export async function apiPost(path: string, body: object): Promise<ApiResponse> {
    const response = await fetch(API_BASE_URL + path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })

    const data = response.headers.get('content-type')?.includes('application/json')
        ? await response.json()
        : null

    return {
        status: response.status,
        ok: response.ok,
        data,
    }
}
