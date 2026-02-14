import getToken from "./jwt";
import { apiGet } from "./apiClient";

const getCurrentUserData = async () => {
    try {
        const token = await getToken()

        if (!token) return { isLogged: false }

        const response = await apiGet('/api/v2/users/me', token.value)

        if (!response.ok) {
            return { isLogged: false }
        }

        return { ...response.data, isLogged: true }
    } catch {
        return { isLogged: false }
    }
}

export default getCurrentUserData
