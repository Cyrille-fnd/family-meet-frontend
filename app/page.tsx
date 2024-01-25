import HomeView from "@/components/home/homeView/HomeView";
import { redirect } from 'next/navigation'
import getCurrentUserData from "./services/user";

export default async function Home() {
  const {isLogged} = await getCurrentUserData()

  if (isLogged) redirect('/events')

  return (
      <HomeView />
  )
}
