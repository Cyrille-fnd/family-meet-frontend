import getToken from "./jwt"
import { apiGet } from "./apiClient"

const getEvents = async () => {
  try {
    const token = await getToken()

    if (!token) return []

    const response = await apiGet("/api/v2/meets", token.value)

    if (response.ok) {
      return response.data
    } else {
      return []
    }
  } catch {
    return []
  }
}

export default getEvents
