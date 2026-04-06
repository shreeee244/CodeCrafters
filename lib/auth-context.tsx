"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

interface User {
  id: string
  name: string
  email: string
  avatar: string
  driverLevel: "Rookie" | "Pro" | "Legend" | "Champion"
  joinedDate: string
  totalReports: number
  savedCities: string[]
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

const mockUser: User = {
  id: "driver-001",
  name: "Alex Racer",
  email: "alex@marketprix.io",
  avatar: "AR",
  driverLevel: "Pro",
  joinedDate: "2024-01-15",
  totalReports: 47,
  savedCities: ["bangalore", "chennai"],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800))
    
    // Mock authentication - any credentials work
    if (email && password) {
      setUser({
        ...mockUser,
        email,
        name: email.split("@")[0].replace(/[.]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      })
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
