"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { apiClient, mapApiUserToUser, ApiUser } from '@/lib/api'

export type UserRole = 'buyer' | 'seller' | 'supervisor'

export interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  avatar?: string
  isVerified: boolean
  role: UserRole
  subscription?: {
    type: 'basic' | 'premium' | 'enterprise'
    expiresAt: string
    isActive: boolean
  }
  permissions: {
    canSell: boolean
    canBuy: boolean
    canRent: boolean
    canSupervise: boolean
    canManageUsers: boolean
  }
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  updateUserRole: (role: UserRole) => void
  setUserFromApi: (apiUser: ApiUser) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const persistUser = (apiUser: ApiUser) => {
    const mappedUser = mapApiUserToUser(apiUser)
    setUser(mappedUser)
    localStorage.setItem('autolink_user', JSON.stringify(mappedUser))
  }

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('autolink_user')
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        // Optionally verify with API
        if (userData.email) {
          apiClient.getCurrentUser(userData.email)
            .then(apiUser => {
              setUser(mapApiUserToUser(apiUser))
              localStorage.setItem('autolink_user', JSON.stringify(mapApiUserToUser(apiUser)))
            })
            .catch(() => {
              // If API call fails, keep local user
            })
        }
      } catch (e) {
        localStorage.removeItem('autolink_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      const apiUser = await apiClient.login(email, password)
      persistUser(apiUser)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
      return false
    }
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true)
    try {
      const apiUser = await apiClient.register({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email || '',
        password: userData.password,
        phone: userData.phone || '',
        role: userData.role?.toUpperCase() as 'BUYER' | 'SELLER' | 'SUPERVISOR' | undefined,
        city: userData.city,
      })
      persistUser(apiUser)
      setIsLoading(false)
      return true
    } catch (error) {
      console.error('Registration error:', error)
      setIsLoading(false)
      return false
    }
  }

  const updateUserRole = (role: UserRole) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        role,
        permissions: {
          canSell: role === 'seller' || role === 'supervisor',
          canBuy: true,
          canRent: true,
          canSupervise: role === 'supervisor',
          canManageUsers: role === 'supervisor'
        }
      }
      setUser(updatedUser)
      localStorage.setItem('autolink_user', JSON.stringify(updatedUser))
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('autolink_user')
  }

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register,
    updateUserRole,
    setUserFromApi: persistUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
