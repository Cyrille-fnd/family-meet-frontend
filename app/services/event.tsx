import getToken from "./jwt";
import { apiGet } from "./apiClient";

const getEvents = async () => {
    const token = await getToken()

    if (!token) return {
        isLogged: false
    }

    const response = await apiGet('/api/v2/meets', token.value)

    if (response.ok) {
        return response.data
    } else {
        return []
    }
}

export default getEvents
