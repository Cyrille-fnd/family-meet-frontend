import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AuthProvider } from "./context/AuthContext"
import getCurrentUserData from "./services/user"
import getToken from "./services/jwt"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Family Meet",
  description: "A family social network",
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const token = await getToken()
  const userData = token ? await getCurrentUserData() : null
  const user = userData?.isLogged ? userData : null

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider user={user} token={token?.value ?? null}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
