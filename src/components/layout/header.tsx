"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { Car, Menu, User, Search, X, MapPin, ChevronDown, Plus, Shield, LogIn, FileText, MessageSquare, Calendar, Settings, LogOut, Crown, Users } from "lucide-react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const { user, isAuthenticated, logout } = useAuth()

  // Données pour l'autocomplétion
  const searchSuggestions = [
    "Toyota Corolla",
    "Toyota Hilux", 
    "BMW X5",
    "Mercedes-Benz Classe C",
    "Peugeot 3008",
    "Renault Duster",
    "Hyundai Tucson",
    "Kia Sportage",
    "Nissan Navara",
    "Audi A4",
    "Volkswagen Golf",
    "Dakar",
    "Thiès",
    "Kaolack",
    "Ziguinchor",
    "Saint-Louis",
    "voiture occasion",
    "location voiture",
    "SUV",
    "berline",
    "pick-up"
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  // Fonction pour gérer l'autocomplétion
  const handleSearchInputChange = (value: string) => {
    setSearchQuery(value)
    
    if (value.length > 0) {
      const filteredSuggestions = searchSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      )
      setSuggestions(filteredSuggestions.slice(0, 8)) // Limiter à 8 suggestions
      setShowSuggestions(true)
      setSelectedSuggestionIndex(-1)
    } else {
      setShowSuggestions(false)
      setSuggestions([])
    }
  }

  // Fonction pour gérer la recherche
  const handleSearch = (query: string = searchQuery) => {
    if (!query.trim()) return
    
    // Analyser la requête pour extraire les critères
    const searchParams = new URLSearchParams()
    
    // Détecter les marques et modèles
    const brands = ["Toyota", "BMW", "Mercedes-Benz", "Peugeot", "Renault", "Hyundai", "Kia", "Nissan", "Audi", "Volkswagen"]
    const models = ["Corolla", "Hilux", "X5", "Classe C", "3008", "Duster", "Tucson", "Sportage", "Navara", "A4", "Golf"]
    const cities = ["Dakar", "Thiès", "Kaolack", "Ziguinchor", "Saint-Louis"]
    
    // Extraire la marque
    const detectedBrand = brands.find(brand => 
      query.toLowerCase().includes(brand.toLowerCase())
    )
    if (detectedBrand) {
      searchParams.set("make", detectedBrand)
    }
    
    // Extraire le modèle
    const detectedModel = models.find(model => 
      query.toLowerCase().includes(model.toLowerCase())
    )
    if (detectedModel) {
      searchParams.set("model", detectedModel)
    }
    
    // Extraire la ville
    const detectedCity = cities.find(city => 
      query.toLowerCase().includes(city.toLowerCase())
    )
    if (detectedCity) {
      searchParams.set("city", detectedCity)
    }
    
    // Si aucun critère spécifique n'est détecté, utiliser la requête complète
    if (!detectedBrand && !detectedModel && !detectedCity) {
      searchParams.set("query", query)
    }
    
    // Rediriger vers la page de recherche
    const queryString = searchParams.toString()
    router.push(`/cars${queryString ? `?${queryString}` : ""}`)
    
    // Fermer les suggestions
    setShowSuggestions(false)
    setSearchQuery("")
  }

  // Fonction pour gérer les touches du clavier
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) {
      if (e.key === "Enter") {
        handleSearch()
      }
      return
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        )
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : -1
        )
        break
      case "Enter":
        e.preventDefault()
        if (selectedSuggestionIndex >= 0) {
          handleSearch(suggestions[selectedSuggestionIndex])
        } else {
          handleSearch()
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  // Fonction pour sélectionner une suggestion
  const selectSuggestion = (suggestion: string) => {
    setSearchQuery(suggestion)
    setShowSuggestions(false)
    handleSearch(suggestion)
  }

  // Close user menu and suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isUserMenuOpen && !target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false)
      }
      if (showSuggestions && !target.closest('.search-container')) {
        setShowSuggestions(false)
        setSelectedSuggestionIndex(-1)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen, showSuggestions])

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      {/* Top Bar - Hidden on mobile */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2" style={{backgroundColor: '#4A7C59', color: 'white'}}>
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center space-x-6">
            <span>+221 33 123 45 67</span>
            <span>•</span>
            <span>Service client</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/help" className="hover:underline">Aide</Link>
            <Link href="/contact" className="hover:underline">Contact</Link>
                <Link href="/post">
                  <Button variant="outline" size="sm" className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer">
                    <Plus className="h-4 w-4 mr-2" />
                    Déposer une annonce
                  </Button>
                </Link>
            {/* User Menu Dropdown */}
            <div className="relative user-menu-container">
              {isAuthenticated ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer"
                    onClick={toggleUserMenu}
                  >
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName} {user?.lastName}
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {user?.role === 'buyer' && 'Acheteur'}
                      {user?.role === 'seller' && 'Vendeur'}
                      {user?.role === 'supervisor' && 'Superviseur'}
                    </Badge>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </Button>
                  
                  {/* Dropdown Menu */}
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Role Badge */}
                      <div className="px-4 py-2 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          {user?.role === 'supervisor' && <Crown className="h-4 w-4 text-yellow-500" />}
                          {user?.role === 'seller' && <Shield className="h-4 w-4 text-[#262626]" />}
                          {user?.role === 'buyer' && <User className="h-4 w-4 text-[#ff8900]" />}
                          <span className="text-sm font-medium text-gray-700">
                            {user?.role === 'buyer' && 'Profil Acheteur/Locataire'}
                            {user?.role === 'seller' && 'Profil Vendeur'}
                            {user?.role === 'supervisor' && 'Profil Superviseur'}
                          </span>
                        </div>
                      </div>

                      {/* Mes annonces - seulement pour vendeurs et superviseurs */}
                      {user?.permissions?.canSell && (
                        <Link 
                          href="/profile/my-ads" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <FileText className="h-4 w-4 mr-3" />
                          Mes annonces
                        </Link>
                      )}

                      {/* Ma messagerie */}
                      <Link 
                        href="/profile/messages" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <MessageSquare className="h-4 w-4 mr-3" />
                        Ma messagerie
                      </Link>

                      {/* Mes recherches - seulement pour acheteurs */}
                      {user?.permissions?.canBuy && (
                        <Link 
                          href="/profile/searches" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Search className="h-4 w-4 mr-3" />
                          Mes recherches
                        </Link>
                      )}

                      {/* Mes rendez-vous */}
                      <Link 
                        href="/profile/appointments" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Calendar className="h-4 w-4 mr-3" />
                        Mes rendez-vous
                      </Link>

                      {/* Séparateur */}
                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Mon profil */}
                      <Link 
                        href="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 mr-3" />
                        Mon profil
                      </Link>

                      {/* Dashboard Superviseur - seulement pour superviseurs */}
                      {user?.permissions?.canSupervise && (
                        <Link 
                          href="/supervisor" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Crown className="h-4 w-4 mr-3 text-yellow-500" />
                          Dashboard Superviseur
                        </Link>
                      )}

                      {/* Gestion des utilisateurs - seulement pour superviseurs */}
                      {user?.permissions?.canManageUsers && (
                        <Link 
                          href="/supervisor/users" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          <Users className="h-4 w-4 mr-3 text-purple-500" />
                          Gestion utilisateurs
                        </Link>
                      )}

                      {/* Séparateur */}
                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Se déconnecter */}
                      <button 
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        onClick={() => {
                          setIsUserMenuOpen(false)
                          logout()
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-3" />
                        Se déconnecter
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link href="/auth">
                  <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10 cursor-pointer">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="h-6 w-6 sm:h-8 sm:w-8 text-primary" style={{color: '#4A7C59'}} />
            <span className="font-bold text-lg sm:text-xl lg:text-2xl text-primary" style={{color: '#4A7C59'}}>
              <span className="hidden sm:inline">AutoLink Sénégal</span>
              <span className="sm:hidden">AutoLink</span>
            </span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 md:hidden">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-4 lg:mx-8">
            <div className="relative w-full search-container">
              <Input
                ref={searchInputRef}
                placeholder="Rechercher une voiture (marque, modèle, ville...)"
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-4 py-3 text-base border-2 border-gray-300 focus:border-primary rounded-lg"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              
              {/* Suggestions d'autocomplétion */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                        index === selectedSuggestionIndex ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Desktop user menu will be added here */}
          </div>
        </div>

      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg">
          <div className="container mx-auto px-4 sm:px-6 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative search-container">
              <Input
                placeholder="Rechercher une voiture..."
                value={searchQuery}
                onChange={(e) => handleSearchInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-4 py-3 text-base"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              
              {/* Suggestions d'autocomplétion mobile */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                        index === selectedSuggestionIndex ? 'bg-gray-100' : ''
                      }`}
                      onClick={() => selectSuggestion(suggestion)}
                    >
                      <div className="flex items-center gap-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Link href="/post" className="block">
                <Button className="w-full bg-primary text-white hover:bg-primary/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Déposer une annonce
                </Button>
              </Link>
              <Link href="/cars" className="block">
                <Button variant="outline" className="w-full">
                  <Car className="h-4 w-4 mr-2" />
                  Voir les voitures
                </Button>
              </Link>
            </div>

            {/* Mobile User Menu */}
            <div className="border-t pt-4">
              {isAuthenticated ? (
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{user?.firstName} {user?.lastName}</p>
                      <p className="text-xs text-gray-500">{user?.role === 'seller' ? 'Vendeur' : user?.role === 'supervisor' ? 'Superviseur' : 'Acheteur'}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Link href="/profile" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                      Mon profil
                    </Link>
                    {user?.permissions?.canSell && (
                      <Link href="/profile/my-ads" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                        Mes annonces
                      </Link>
                    )}
                    <Link href="/profile/messages" className="block px-3 py-2 text-sm hover:bg-gray-50 rounded">
                      Ma messagerie
                    </Link>
                    <button 
                      className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
                      onClick={() => {
                        setIsMobileMenuOpen(false)
                        logout()
                      }}
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/auth" className="block">
                  <Button className="w-full bg-primary text-white hover:bg-primary/90">
                    <LogIn className="h-4 w-4 mr-2" />
                    Se connecter
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

