"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users with different profiles
  const mockUsers: Record<string, User> = {
    'buyer': {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@email.com',
      phone: '+221 33 123 45 67',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
      role: 'buyer',
      permissions: {
        canSell: false,
        canBuy: true,
        canRent: true,
        canSupervise: false,
        canManageUsers: false
      }
    },
    'seller': {
      id: '2',
      firstName: 'Marie',
      lastName: 'Diop',
      email: 'marie.diop@email.com',
      phone: '+221 33 987 65 43',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
      role: 'seller',
      subscription: {
        type: 'premium',
        expiresAt: '2024-12-31',
        isActive: true
      },
      permissions: {
        canSell: true,
        canBuy: true,
        canRent: true,
        canSupervise: false,
        canManageUsers: false
      }
    },
    'supervisor': {
      id: '3',
      firstName: 'Amadou',
      lastName: 'Sarr',
      email: 'amadou.sarr@email.com',
      phone: '+221 33 555 44 33',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isVerified: true,
      role: 'supervisor',
      permissions: {
        canSell: true,
        canBuy: true,
        canRent: true,
        canSupervise: true,
        canManageUsers: true
      }
    }
  }

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('autolink_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Mock login - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simple mock validation with different profiles
    let selectedUser: User | null = null
    
    if (email === 'jean.dupont@email.com' && password === 'password') {
      selectedUser = mockUsers.buyer
    } else if (email === 'marie.diop@email.com' && password === 'password') {
      selectedUser = mockUsers.seller
    } else if (email === 'amadou.sarr@email.com' && password === 'password') {
      selectedUser = mockUsers.supervisor
    }
    
    if (selectedUser) {
      setUser(selectedUser)
      localStorage.setItem('autolink_user', JSON.stringify(selectedUser))
      setIsLoading(false)
      return true
    }
    
    setIsLoading(false)
    return false
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    setIsLoading(true)
    
    // Mock registration - simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      isVerified: false,
      role: (userData.role as UserRole) || 'buyer',
      permissions: {
        canSell: (userData.role as UserRole) === 'seller' || (userData.role as UserRole) === 'supervisor',
        canBuy: true,
        canRent: true,
        canSupervise: (userData.role as UserRole) === 'supervisor',
        canManageUsers: (userData.role as UserRole) === 'supervisor'
      }
    }
    
    setUser(newUser)
    localStorage.setItem('autolink_user', JSON.stringify(newUser))
    setIsLoading(false)
    return true
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
    updateUserRole
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
