"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Edit, 
  Save, 
  Shield, 
  Star,
  Eye,
  Heart,
  Settings,
  Bell,
  CreditCard,
  FileText,
  LogOut,
  Car,
  TrendingUp,
  Award,
  Clock,
  Crown
} from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("profile")
  const { user, isAuthenticated, logout } = useAuth()

  // Redirect if not authenticated
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Non connecté</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à votre profil.
              </p>
              <Link href="/auth">
                <Button>Se connecter</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const [profileStats] = useState({
    adsPosted: user?.permissions?.canSell ? 5 : 0,
    adsSold: user?.permissions?.canSell ? 3 : 0,
    favoritesCount: 8,
    viewsReceived: user?.permissions?.canSell ? 245 : 0,
    responseRate: user?.permissions?.canSell ? 95 : 0
  })

  const handleInputChange = (field: string, value: string) => {
    // In a real app, this would update the user data via API
    console.log(`Updating ${field} to ${value}`)
  }

  const handleSave = () => {
    setIsEditing(false)
    // In a real app, this would save the data via API
    console.log("Profile saved")
  }

  const tabs = [
    { id: "profile", label: "Profil", icon: User },
    ...(user?.permissions?.canSell ? [{ id: "ads", label: "Mes Annonces", icon: Car }] : []),
    { id: "favorites", label: "Favoris", icon: Heart },
    { id: "settings", label: "Paramètres", icon: Settings }
  ]

  return (
    <div className="min-h-screen py-6 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">Mon Profil</h1>
              <p className="text-gray-600 text-sm sm:text-base">Gérez vos informations et préférences</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" className="w-full sm:w-auto">
                <Settings className="h-4 w-4 mr-2" />
                Paramètres
              </Button>
              <Button variant="outline" onClick={logout} className="w-full sm:w-auto">
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4 sm:p-6">
                {/* Avatar et infos de base */}
                <div className="text-center mb-4 sm:mb-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={`${user.firstName} ${user.lastName}`}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-medium text-gray-600">
                        {user.firstName[0]}{user.lastName[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-base sm:text-lg">
                    {user.firstName} {user.lastName}
                  </h3>
                  <div className="flex items-center justify-center gap-2 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {user.role === "buyer" && "Acheteur/Locataire"}
                      {user.role === "seller" && "Vendeur"}
                      {user.role === "supervisor" && "Superviseur"}
                    </Badge>
                    {user.isVerified && (
                      <Badge className="text-xs bg-[#ff8900]">
                        <Shield className="h-3 w-3 mr-1" />
                        Vérifié
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      style={activeTab === tab.id ? {backgroundColor: '#4A7C59'} : {}}
                    >
                      <tab.icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Statistiques rapides */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                  <h4 className="font-semibold mb-3 text-sm sm:text-base">Statistiques</h4>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Annonces publiées</span>
                      <span className="font-medium">{profileStats.adsPosted}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Ventes réalisées</span>
                      <span className="font-medium">{profileStats.adsSold}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Favoris</span>
                      <span className="font-medium">{profileStats.favoritesCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vues reçues</span>
                      <span className="font-medium">{profileStats.viewsReceived}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            {/* Onglet Profil */}
            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Informations Personnelles</CardTitle>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Sauvegarder
                        </>
                      ) : (
                        <>
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </>
                      )}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Prénom</label>
                      <Input
                        value={user.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom</label>
                      <Input
                        value={user.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input
                        type="email"
                        value={user.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Téléphone</label>
                      <Input
                        type="tel"
                        value={user.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ville</label>
                      <select
                        value="Dakar"
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        disabled={!isEditing}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary disabled:bg-gray-100"
                      >
                        <option value="dakar">Dakar</option>
                        <option value="thies">Thiès</option>
                        <option value="kaolack">Kaolack</option>
                        <option value="saint-louis">Saint-Louis</option>
                        <option value="ziguinchor">Ziguinchor</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Date de naissance</label>
                      <Input
                        type="date"
                        value="1990-05-15"
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sexe</label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="default"
                          onClick={() => handleInputChange("gender", "male")}
                          disabled={!isEditing}
                          size="sm"
                        >
                          Homme
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => handleInputChange("gender", "female")}
                          disabled={!isEditing}
                          size="sm"
                        >
                          Femme
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type de compte</label>
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant={user.role === "buyer" ? "default" : "outline"}
                          onClick={() => handleInputChange("userType", "buyer")}
                          disabled={!isEditing}
                          size="sm"
                        >
                          Acheteur/Locataire
                        </Button>
                        <Button
                          type="button"
                          variant={user.role === "seller" ? "default" : "outline"}
                          onClick={() => handleInputChange("userType", "seller")}
                          disabled={!isEditing}
                          size="sm"
                        >
                          Vendeur
                        </Button>
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="mt-6 flex gap-2">
                      <Button onClick={handleSave}>
                        <Save className="h-4 w-4 mr-2" />
                        Sauvegarder les modifications
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Annuler
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Onglet Mes Annonces */}
            {activeTab === "ads" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Mes Annonces</CardTitle>
                      <Button>
                        <Car className="h-4 w-4 mr-2" />
                        Nouvelle Annonce
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Annonces d'exemple */}
                      {[1, 2, 3].map((ad) => (
                        <div key={ad} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="aspect-video bg-gray-200 rounded-lg mb-3"></div>
                          <h4 className="font-semibold mb-2">Toyota Corolla 2022</h4>
                          <p className="text-sm text-gray-600 mb-2">8 500 000 CFA</p>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500">245 vues</span>
                            <Badge variant="secondary">Active</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Onglet Favoris */}
            {activeTab === "favorites" && (
              <Card>
                <CardHeader>
                  <CardTitle>Mes Favoris</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Favoris d'exemple */}
                    {[1, 2, 3, 4, 5, 6].map((fav) => (
                      <div key={fav} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="aspect-video bg-gray-200 rounded-lg mb-3"></div>
                        <h4 className="font-semibold mb-2">BMW X5 2023</h4>
                        <p className="text-sm text-gray-600 mb-2">12 000 000 CFA</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Dakar</span>
                          <Button variant="outline" size="sm">
                            <Heart className="h-4 w-4 mr-1" />
                            Retirer
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Onglet Paramètres */}
            {activeTab === "settings" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications par email</h4>
                        <p className="text-sm text-gray-600">Recevoir des emails pour les nouvelles annonces</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Activé
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Notifications SMS</h4>
                        <p className="text-sm text-gray-600">Recevoir des SMS pour les messages importants</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Bell className="h-4 w-4 mr-2" />
                        Activé
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Abonnement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Plan actuel</h4>
                        <p className="text-sm text-gray-600">Plan Gratuit</p>
                      </div>
                      <Button>
                        <CreditCard className="h-4 w-4 mr-2" />
                        Mettre à niveau
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Confidentialité</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Profil public</h4>
                        <p className="text-sm text-gray-600">Permettre aux autres utilisateurs de voir votre profil</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        Activé
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
