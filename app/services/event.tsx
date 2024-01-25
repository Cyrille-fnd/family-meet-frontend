import getToken from "./jwt";

const getEvents = async () => {
    const token = getToken()

    if (!token) return {
        isLogged: false
    }

    const requestOptions = {
        method: 'GET',
        headers: {
            'Authorization': 'bearer '+token.value,
            'Access-Control-Allow-Origin': "*",
        },
    };

    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/events', requestOptions)

    return response.json()
}

export default getEvents