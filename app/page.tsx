import HomeView from "@/components/homeView/HomeView";
import {cookies} from "next/headers";
import { redirect } from 'next/navigation'

async function getUserAccountData() {
  const cookieStore = cookies()
  const token = cookieStore.get("x-auth-token")

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

  const response = await fetch(process.env.API_URL + '/v1/api/users', requestOptions)

  if (!response.ok) {
    return {isLogged: false}
  }

  const data = await response.json();

  return {...data, isLogged: true}
}

export default async function Home() {
  const {isLogged} = await getUserAccountData()

  if (isLogged) redirect('/account')

  return (
      <HomeView />
  )
}
