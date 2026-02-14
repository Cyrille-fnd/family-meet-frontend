import { cookies } from "next/headers"

const getToken = async () => {
  const cookieStore = await cookies()

  return cookieStore.get("x-auth-token")
}

export default getToken
