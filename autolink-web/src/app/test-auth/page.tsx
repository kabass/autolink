"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { User, LogOut, LogIn, Crown, Shield, Users } from "lucide-react"

export default function TestAuthPage() {
  const { user, isAuthenticated, logout, login } = useAuth()

  const handleQuickLogin = async (role: 'buyer' | 'seller' | 'supervisor') => {
    const credentials = {
      buyer: { email: "jean.dupont@email.com", password: "password" },
      seller: { email: "marie.diop@email.com", password: "password" },
      supervisor: { email: "amadou.sarr@email.com", password: "password" }
    }
    
    const { email, password } = credentials[role]
    await login(email, password)
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'supervisor': return <Crown className="h-4 w-4 text-yellow-500" />
      case 'seller': return <Shield className="h-4 w-4 text-[#262626]" />
      case 'buyer': return <User className="h-4 w-4 text-[#ff8900]" />
      default: return <User className="h-4 w-4" />
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case 'supervisor': return 'Superviseur'
      case 'seller': return 'Vendeur'
      case 'buyer': return 'Acheteur/Locataire'
      default: return role
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Test des Profils Utilisateur
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* État de connexion */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">État actuel :</h3>
              <p className="text-sm">
                {isAuthenticated ? (
                  <span className="text-[#ff8900]">✅ Connecté</span>
                ) : (
                  <span className="text-red-600">❌ Non connecté</span>
                )}
              </p>
            </div>

            {/* Informations utilisateur */}
            {isAuthenticated && user && (
              <div className="p-4 bg-[#fff5e6] rounded-lg">
                <h3 className="font-semibold mb-2">Utilisateur connecté :</h3>
                <div className="text-sm space-y-1">
                  <p><strong>Nom :</strong> {user.firstName} {user.lastName}</p>
                  <p><strong>Email :</strong> {user.email}</p>
                  <p><strong>Téléphone :</strong> {user.phone}</p>
                  <p><strong>Vérifié :</strong> {user.isVerified ? "Oui" : "Non"}</p>
                  <div className="flex items-center gap-2">
                    <strong>Rôle :</strong>
                    {getRoleIcon(user.role)}
                    <Badge variant="secondary">{getRoleName(user.role)}</Badge>
                  </div>
                  {user.subscription && (
                    <p><strong>Abonnement :</strong> {user.subscription.type} (Expire: {user.subscription.expiresAt})</p>
                  )}
                </div>
                
                {/* Permissions */}
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Permissions :</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className={user.permissions.canSell ? "text-[#ff8900]" : "text-red-600"}>
                        {user.permissions.canSell ? "✅" : "❌"}
                      </span>
                      Peut vendre
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={user.permissions.canBuy ? "text-[#ff8900]" : "text-red-600"}>
                        {user.permissions.canBuy ? "✅" : "❌"}
                      </span>
                      Peut acheter
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={user.permissions.canRent ? "text-[#ff8900]" : "text-red-600"}>
                        {user.permissions.canRent ? "✅" : "❌"}
                      </span>
                      Peut louer
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={user.permissions.canSupervise ? "text-[#ff8900]" : "text-red-600"}>
                        {user.permissions.canSupervise ? "✅" : "❌"}
                      </span>
                      Peut superviser
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={user.permissions.canManageUsers ? "text-[#ff8900]" : "text-red-600"}>
                        {user.permissions.canManageUsers ? "✅" : "❌"}
                      </span>
                      Peut gérer les utilisateurs
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Actions de connexion */}
            <div className="space-y-4">
              <h3 className="font-semibold">Tester les différents profils :</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button 
                  onClick={() => handleQuickLogin('buyer')} 
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <User className="h-4 w-4 text-[#ff8900]" />
                  Connexion Acheteur
                </Button>
                <Button 
                  onClick={() => handleQuickLogin('seller')} 
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <Shield className="h-4 w-4 text-[#262626]" />
                  Connexion Vendeur
                </Button>
                <Button 
                  onClick={() => handleQuickLogin('supervisor')} 
                  className="flex items-center gap-2"
                  variant="outline"
                >
                  <Crown className="h-4 w-4 text-yellow-500" />
                  Connexion Superviseur
                </Button>
              </div>
              
              {isAuthenticated && (
                <Button onClick={logout} variant="destructive" className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Se déconnecter
                </Button>
              )}
            </div>

            {/* Instructions */}
            <div className="p-4 bg-[#f5f5f5] rounded-lg">
              <h3 className="font-semibold mb-2">Instructions :</h3>
              <ul className="text-sm space-y-1">
                <li>• <strong>Acheteur/Locataire :</strong> Peut acheter et louer des véhicules</li>
                <li>• <strong>Vendeur :</strong> Peut vendre, acheter et louer + abonnement premium</li>
                <li>• <strong>Superviseur :</strong> Toutes les permissions + gestion des utilisateurs</li>
                <li>• Vérifiez que le header affiche le bon rôle et les bonnes options de menu</li>
                <li>• Testez les différentes fonctionnalités selon le profil connecté</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
