import getToken from "./jwt";
import { apiGet } from "./apiClient";

const getCurrentUserData = async () => {
    const token = getToken()

    if (!token) return {
      isLogged: false
    }

    const response = await apiGet('/api/v2/users?current=true', token.value)

    if (!response.ok) {
      return {isLogged: false}
    }

    return {...response.data, isLogged: true}
}

export default getCurrentUserData
