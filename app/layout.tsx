import "./globals.css"
import type { Metadata } from "next"
import { Nunito } from "next/font/google"
import { AuthProvider } from "./context/AuthContext"
import getCurrentUserData from "./services/user"
import getToken from "./services/jwt"

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
})

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
    <html lang="fr">
      <body className={nunito.className}>
        <AuthProvider user={user} token={token?.value ?? null}>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
