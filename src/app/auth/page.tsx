"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  Phone,
  Calendar,
  MapPin,
  Shield,
  CheckCircle,
  Crown
} from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { login, register, isAuthenticated } = useAuth()
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    birthDate: "",
    city: "",
    gender: "",
    userType: "buyer", // buyer, seller, supervisor
    role: "buyer" as "buyer" | "seller" | "supervisor"
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    
    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (success) {
          router.push("/")
        } else {
          setError("Email ou mot de passe incorrect")
        }
      } else {
        const success = await register({
          ...formData,
          role: formData.role
        })
        if (success) {
          router.push("/")
        } else {
          setError("Erreur lors de l'inscription")
        }
      }
    } catch (err) {
      setError("Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container max-w-md mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {isLogin ? "Connexion" : "Créer un compte"}
          </h1>
          <p className="text-gray-600">
            {isLogin 
              ? "Connectez-vous à votre compte AutoLink" 
              : "Rejoignez AutoLink Sénégal"
            }
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? "Se connecter" : "S'inscrire"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Type d'utilisateur pour l'inscription */}
              {!isLogin && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Je suis</label>
                  <div className="grid grid-cols-1 gap-2">
                    <Button
                      type="button"
                      variant={formData.role === "buyer" ? "default" : "outline"}
                      onClick={() => {
                        handleInputChange("userType", "buyer")
                        handleInputChange("role", "buyer")
                      }}
                      className="flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      Acheteur/Locataire
                    </Button>
                    <Button
                      type="button"
                      variant={formData.role === "seller" ? "default" : "outline"}
                      onClick={() => {
                        handleInputChange("userType", "seller")
                        handleInputChange("role", "seller")
                      }}
                      className="flex items-center gap-2"
                    >
                      <Shield className="h-4 w-4" />
                      Vendeur
                    </Button>
                    <Button
                      type="button"
                      variant={formData.role === "supervisor" ? "default" : "outline"}
                      onClick={() => {
                        handleInputChange("userType", "supervisor")
                        handleInputChange("role", "supervisor")
                      }}
                      className="flex items-center gap-2"
                    >
                      <Crown className="h-4 w-4" />
                      Superviseur
                    </Button>
                  </div>
                </div>
              )}

              {/* Nom et Prénom pour l'inscription */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prénom *</label>
                    <Input
                      placeholder="Jean"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange("firstName", e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom *</label>
                    <Input
                      placeholder="Dupont"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required={!isLogin}
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    placeholder="jean@exemple.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Mot de passe */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Mot de passe *</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>

              {/* Champs supplémentaires pour l'inscription */}
              {!isLogin && (
                <>
                  {/* Téléphone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="tel"
                        placeholder="+221 33 123 45 67"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Date de naissance */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Date de naissance *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={formData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Sexe */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Sexe *</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={formData.gender === "male" ? "default" : "outline"}
                        onClick={() => handleInputChange("gender", "male")}
                      >
                        Homme
                      </Button>
                      <Button
                        type="button"
                        variant={formData.gender === "female" ? "default" : "outline"}
                        onClick={() => handleInputChange("gender", "female")}
                      >
                        Femme
                      </Button>
                    </div>
                  </div>

                  {/* Ville */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Ville *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Sélectionnez votre ville</option>
                        <option value="dakar">Dakar</option>
                        <option value="thies">Thiès</option>
                        <option value="kaolack">Kaolack</option>
                        <option value="saint-louis">Saint-Louis</option>
                        <option value="ziguinchor">Ziguinchor</option>
                        <option value="diourbel">Diourbel</option>
                        <option value="tambacounda">Tambacounda</option>
                        <option value="kolda">Kolda</option>
                        <option value="matam">Matam</option>
                        <option value="fatick">Fatick</option>
                        <option value="kedougou">Kédougou</option>
                        <option value="sedhiou">Sédhiou</option>
                        <option value="kaffrine">Kaffrine</option>
                        <option value="louga">Louga</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Bouton de soumission */}
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? "Connexion..." : "Création..."}
                  </>
                ) : (
                  isLogin ? "Se connecter" : "Créer mon compte"
                )}
              </Button>
            </form>

            {/* Séparateur */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou continuer avec</span>
              </div>
            </div>

            {/* Connexion sociale */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="h-4 w-4 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>

            {/* Lien de connexion/inscription */}
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                {isLogin ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-1 text-primary hover:underline"
                  style={{color: '#4A7C59'}}
                >
                  {isLogin ? "S'inscrire" : "Se connecter"}
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Informations de sécurité */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
            <Shield className="h-4 w-4" />
            <span>Vos données sont protégées et sécurisées</span>
          </div>
        </div>
      </div>
    </div>
  )
}
