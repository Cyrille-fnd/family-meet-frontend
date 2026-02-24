"use client"
import { createContext, useContext } from "react"

interface AuthContextType {
  user: User | null
  token: string | null
}

const AuthContext = createContext<AuthContextType>({ user: null, token: null })

export function AuthProvider({
  children,
  user,
  token,
}: {
  children: React.ReactNode
  user: User | null
  token: string | null
}) {
  return (
    <AuthContext.Provider value={{ user, token }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
