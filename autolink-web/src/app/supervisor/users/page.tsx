"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { Users, Search, Filter, Shield, Crown, User, Mail, Phone, Calendar, Ban, CheckCircle, XCircle } from "lucide-react"

// Données d'exemple d'utilisateurs
const users = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+221 33 123 45 67",
    role: "buyer",
    isVerified: true,
    isActive: true,
    joinDate: "2023-01-15",
    adsCount: 0,
    lastActivity: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Diop",
    email: "marie.diop@email.com",
    phone: "+221 33 987 65 43",
    role: "seller",
    isVerified: true,
    isActive: true,
    joinDate: "2023-03-20",
    adsCount: 5,
    lastActivity: "2024-01-14T15:45:00Z"
  },
  {
    id: "3",
    firstName: "Amadou",
    lastName: "Sarr",
    email: "amadou.sarr@email.com",
    phone: "+221 33 555 44 33",
    role: "supervisor",
    isVerified: true,
    isActive: true,
    joinDate: "2023-02-10",
    adsCount: 2,
    lastActivity: "2024-01-15T09:20:00Z"
  },
  {
    id: "4",
    firstName: "Fatou",
    lastName: "Fall",
    email: "fatou.fall@email.com",
    phone: "+221 77 111 22 33",
    role: "seller",
    isVerified: false,
    isActive: true,
    joinDate: "2024-01-10",
    adsCount: 1,
    lastActivity: "2024-01-13T14:15:00Z"
  },
  {
    id: "5",
    firstName: "Ibrahima",
    lastName: "Ndiaye",
    email: "ibrahima.ndiaye@email.com",
    phone: "+221 77 444 55 66",
    role: "buyer",
    isVerified: true,
    isActive: false,
    joinDate: "2023-12-05",
    adsCount: 0,
    lastActivity: "2023-12-20T16:30:00Z"
  }
]

export default function UsersManagementPage() {
  const [usersList, setUsersList] = useState(users)
  const [searchQuery, setSearchQuery] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à la gestion des utilisateurs.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user?.permissions?.canManageUsers) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Permissions insuffisantes</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être superviseur pour accéder à cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleToggleUserStatus = (userId: string) => {
    setUsersList(usersList.map(user => 
      user.id === userId ? { ...user, isActive: !user.isActive } : user
    ))
  }

  const handleToggleVerification = (userId: string) => {
    setUsersList(usersList.map(user => 
      user.id === userId ? { ...user, isVerified: !user.isVerified } : user
    ))
  }

  const filteredUsers = usersList.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = filterRole === "all" || user.role === filterRole
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && user.isActive) ||
                         (filterStatus === "inactive" && !user.isActive) ||
                         (filterStatus === "verified" && user.isVerified) ||
                         (filterStatus === "unverified" && !user.isVerified)
    return matchesSearch && matchesRole && matchesStatus
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "supervisor":
        return <Crown className="h-4 w-4 text-yellow-500" />
      case "seller":
        return <Shield className="h-4 w-4 text-[#262626]" />
      case "buyer":
        return <User className="h-4 w-4 text-[#ff8900]" />
      default:
        return <User className="h-4 w-4" />
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "supervisor":
        return "Superviseur"
      case "seller":
        return "Vendeur"
      case "buyer":
        return "Acheteur"
      default:
        return role
    }
  }

  const activeUsers = usersList.filter(user => user.isActive).length
  const verifiedUsers = usersList.filter(user => user.isVerified).length
  const sellers = usersList.filter(user => user.role === "seller").length
  const buyers = usersList.filter(user => user.role === "buyer").length

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Users className="h-8 w-8 text-purple-500" />
                Gestion des Utilisateurs
              </h1>
              <p className="text-gray-600">Modérez et gérez les comptes utilisateurs</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-purple-600 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Superviseur
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{usersList.length}</div>
              <div className="text-sm text-gray-600">Total utilisateurs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#ff8900]">{activeUsers}</div>
              <div className="text-sm text-gray-600">Actifs</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#262626]">{verifiedUsers}</div>
              <div className="text-sm text-gray-600">Vérifiés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{sellers}</div>
              <div className="text-sm text-gray-600">Vendeurs</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher un utilisateur..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select 
              value={filterRole} 
              onChange={(e) => setFilterRole(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">Tous les rôles</option>
              <option value="buyer">Acheteurs</option>
              <option value="seller">Vendeurs</option>
              <option value="supervisor">Superviseurs</option>
            </select>
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="verified">Vérifiés</option>
              <option value="unverified">Non vérifiés</option>
            </select>
          </div>
        </div>

        {/* Users List */}
        {filteredUsers.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun utilisateur trouvé</h3>
              <p className="text-gray-600">
                Aucun utilisateur ne correspond à vos critères de recherche.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {filteredUsers.map((user) => (
              <Card key={user.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-lg font-medium text-gray-600">
                          {user.firstName[0]}{user.lastName[0]}
                        </span>
                      </div>

                      {/* User Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {user.firstName} {user.lastName}
                          </h3>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                            <Badge variant="outline" className="text-xs">
                              {getRoleName(user.role)}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{user.phone}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>Membre depuis {new Date(user.joinDate).toLocaleDateString()}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                          <span>{user.adsCount} annonces</span>
                          <span>Dernière activité: {new Date(user.lastActivity).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center gap-3">
                      {/* Status Badges */}
                      <div className="flex flex-col gap-1">
                        {user.isVerified ? (
                          <Badge className="bg-[#ff8900] text-white text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Vérifié
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-600 text-white text-xs">
                            <XCircle className="h-3 w-3 mr-1" />
                            Non vérifié
                          </Badge>
                        )}
                        
                        {user.isActive ? (
                          <Badge className="bg-[#262626] text-white text-xs">
                            Actif
                          </Badge>
                        ) : (
                          <Badge className="bg-red-600 text-white text-xs">
                            Inactif
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleVerification(user.id)}
                        >
                          {user.isVerified ? "Dévérifier" : "Vérifier"}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleUserStatus(user.id)}
                          className={user.isActive ? "text-red-600" : "text-[#ff8900]"}
                        >
                          {user.isActive ? (
                            <>
                              <Ban className="h-4 w-4 mr-1" />
                              Suspendre
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Activer
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
