import cookieCutter from 'cookie-cutter'

const getUserAuthToken = () => {
    const token = cookieCutter.get("x-auth-token")

    if (!token) return null

    return token
}

export default getUserAuthToken
