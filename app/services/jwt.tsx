import { cookies } from "next/headers"

const getToken = () => {
    const cookieStore = cookies()

    return cookieStore.get("x-auth-token")
}

export default getToken