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
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/api/v2/meets', requestOptions)

    if (response.ok) {
        return response.json()
    } else {
        console.log('something wrong happened:')
        return []
    }
}

export default getEvents
