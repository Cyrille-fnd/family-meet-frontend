import getToken from "./jwt";

const getCurrentUserData = async () => {
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
  
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v1/api/users/current', requestOptions)
  
    if (!response.ok) {
      return {isLogged: false}
    }
  
    const data = await response.json();
  
    return {...data, isLogged: true}
}

export default getCurrentUserData