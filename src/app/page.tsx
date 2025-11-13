"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarCard } from "@/components/car/car-card"
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/search/search-filters"
import { Car, Shield, Clock, Star, ArrowRight, CheckCircle, Search, Plus, MapPin, Calendar, User, CreditCard, ShoppingCart } from "lucide-react"

// Données d'exemple de voitures au Sénégal
const sampleCars = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 8500000,
    mileage: 15000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    isRental: false
  },
  {
    id: "2",
    make: "Toyota",
    model: "Hilux",
    year: 2023,
    price: 0,
    mileage: 8000,
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 35000
  },
  {
    id: "3",
    make: "Peugeot",
    model: "3008",
    year: 2023,
    price: 12000000,
    mileage: 5000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=400&h=300&fit=crop",
    isRental: false
  },
  {
    id: "4",
    make: "Renault",
    model: "Duster",
    year: 2021,
    price: 0,
    mileage: 25000,
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 25000
  },
  {
    id: "5",
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 9500000,
    mileage: 12000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=400&h=300&fit=crop",
    isRental: false
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "Classe C",
    year: 2022,
    price: 0,
    mileage: 18000,
    fuelType: "Diesel",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 45000
  },
  {
    id: "7",
    make: "Kia",
    model: "Sportage",
    year: 2023,
    price: 7800000,
    mileage: 6000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
    isRental: false
  },
  {
    id: "8",
    make: "Nissan",
    model: "Navara",
    year: 2021,
    price: 0,
    mileage: 30000,
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 30000
  }
]

export default function Home() {
  const [searchResults, setSearchResults] = useState(sampleCars)
  const router = useRouter()
  
  // États pour les formulaires de recherche
  const [searchForm, setSearchForm] = useState({
    make: "",
    model: "",
    maxMileage: "",
    city: "",
    type: "all" as "all" | "sale" | "rental"
  })

  // Fonction pour gérer la recherche et rediriger vers la page de recherche
  const handleSearchSubmit = () => {
    // Construire les paramètres de recherche
    const searchParams = new URLSearchParams()
    
    if (searchForm.make && searchForm.make !== "Toutes les marques") {
      searchParams.set("make", searchForm.make)
    }
    if (searchForm.model && searchForm.model !== "Tous les modèles") {
      searchParams.set("model", searchForm.model)
    }
    if (searchForm.maxMileage && searchForm.maxMileage !== "Indifférent") {
      searchParams.set("maxMileage", searchForm.maxMileage)
    }
    if (searchForm.city && searchForm.city !== "Toutes les villes") {
      searchParams.set("city", searchForm.city)
    }
    if (searchForm.type && searchForm.type !== "all") {
      searchParams.set("type", searchForm.type)
    }
    
    // Rediriger vers la page de recherche avec les paramètres
    const queryString = searchParams.toString()
    router.push(`/cars${queryString ? `?${queryString}` : ""}`)
  }

  // Fonction pour mettre à jour les valeurs des formulaires
  const handleFormChange = (field: string, value: string) => {
    setSearchForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSearch = (filters: SearchFiltersType) => {
    // Enhanced filtering logic - in a real app, this would be an API call
    let filtered = sampleCars

    if (filters.make) {
      filtered = filtered.filter(car => 
        car.make.toLowerCase().includes(filters.make.toLowerCase())
      )
    }

    if (filters.model) {
      filtered = filtered.filter(car => 
        car.model.toLowerCase().includes(filters.model.toLowerCase())
      )
    }

    if (filters.type !== "all") {
      filtered = filtered.filter(car => 
        filters.type === "sale" ? !car.isRental : car.isRental
      )
    }

    if (filters.fuelType) {
      filtered = filtered.filter(car => 
        car.fuelType.toLowerCase() === filters.fuelType.toLowerCase()
      )
    }

    if (filters.transmission) {
      filtered = filtered.filter(car => 
        car.transmission.toLowerCase() === filters.transmission.toLowerCase()
      )
    }

    if (filters.minPrice) {
      filtered = filtered.filter(car => {
        const price = car.isRental ? car.rentalPricePerDay || 0 : car.price
        return price >= parseInt(filters.minPrice)
      })
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => {
        const price = car.isRental ? car.rentalPricePerDay || 0 : car.price
        return price <= parseInt(filters.maxPrice)
      })
    }

    if (filters.minYear) {
      filtered = filtered.filter(car => car.year >= parseInt(filters.minYear))
    }

    if (filters.maxYear) {
      filtered = filtered.filter(car => car.year <= parseInt(filters.maxYear))
    }

    setSearchResults(filtered)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 py-6 sm:py-8 md:py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              Trouvez votre voiture d'occasion idéale au Sénégal
            </h1>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Plus de 50 000 annonces de voitures d'occasion vérifiées par nos experts à Dakar et dans tout le Sénégal
            </p>
          </div>

          {/* Main Search */}
          <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              {/* Type de transaction */}
              <div className="mb-4 sm:mb-6">
                <label className="text-sm font-medium text-gray-700 mb-3 block">Je cherche à :</label>
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                  <Button
                    variant={searchForm.type === "all" ? "default" : "outline"}
                    onClick={() => handleFormChange("type", "all")}
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                      searchForm.type === "all" 
                        ? "bg-primary text-white" 
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Tout voir
                  </Button>
                  <Button
                    variant={searchForm.type === "sale" ? "default" : "outline"}
                    onClick={() => handleFormChange("type", "sale")}
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                      searchForm.type === "sale" 
                        ? "bg-[#ff8900] text-white hover:bg-[#e67a00]" 
                        : "hover:bg-[#fff5e6] hover:text-[#ff8900] hover:border-[#ffcc99]"
                    }`}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Acheter
                  </Button>
                  <Button
                    variant={searchForm.type === "rental" ? "default" : "outline"}
                    onClick={() => handleFormChange("type", "rental")}
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base ${
                      searchForm.type === "rental" 
                        ? "bg-[#262626] text-white hover:bg-[#1a1a1a]" 
                        : "hover:bg-[#f5f5f5] hover:text-[#262626] hover:border-[#a0a0a0]"
                    }`}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Louer
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Marque</label>
                  <select 
                    value={searchForm.make}
                    onChange={(e) => handleFormChange("make", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option>Toutes les marques</option>
                    <option>Toyota</option>
                    <option>BMW</option>
                    <option>Mercedes-Benz</option>
                    <option>Audi</option>
                    <option>Volkswagen</option>
                    <option>Peugeot</option>
                    <option>Renault</option>
                    <option>Hyundai</option>
                    <option>Kia</option>
                    <option>Nissan</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Modèle</label>
                  <select 
                    value={searchForm.model}
                    onChange={(e) => handleFormChange("model", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option>Tous les modèles</option>
                    <option>Corolla</option>
                    <option>Hilux</option>
                    <option>3008</option>
                    <option>Duster</option>
                    <option>Tucson</option>
                    <option>Classe C</option>
                    <option>Sportage</option>
                    <option>Navara</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kilométrage max</label>
                  <select 
                    value={searchForm.maxMileage}
                    onChange={(e) => handleFormChange("maxMileage", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option>Indifférent</option>
                    <option>10 000 km</option>
                    <option>20 000 km</option>
                    <option>50 000 km</option>
                    <option>100 000 km</option>
                    <option>150 000 km</option>
                    <option>200 000 km</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Ville</label>
                  <select 
                    value={searchForm.city}
                    onChange={(e) => handleFormChange("city", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                  >
                    <option>Toutes les villes</option>
                    <option>Dakar</option>
                    <option>Thiès</option>
                    <option>Kaolack</option>
                    <option>Ziguinchor</option>
                    <option>Saint-Louis</option>
                    <option>Diourbel</option>
                    <option>Tambacounda</option>
                    <option>Kolda</option>
                    <option>Matam</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-center">
                <Button 
                  onClick={handleSearchSubmit}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-primary text-white hover:bg-primary/90 text-sm sm:text-base" 
                  style={{backgroundColor: '#4A7C59'}}
                >
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher des véhicules
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto mb-6 sm:mb-8 md:mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{color: '#4A7C59'}}>50K+</div>
              <div className="text-sm text-gray-600">Annonces vérifiées</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{color: '#D4AF37'}}>4.8★</div>
              <div className="text-sm text-gray-600">Note clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{color: '#C5282F'}}>500+</div>
              <div className="text-sm text-gray-600">Concessionnaires</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary" style={{color: '#4A7C59'}}>24/7</div>
              <div className="text-sm text-gray-600">Service client</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-6 sm:py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Voitures Populaires</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Découvrez les véhicules les plus recherchés au Sénégal
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <select className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary">
                <option>Trier par pertinence</option>
                <option>Prix croissant</option>
                <option>Prix décroissant</option>
                <option>Année récente</option>
                <option>Kilométrage faible</option>
                <option>Plus populaires</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg">
                <button className="p-2 bg-primary text-white rounded-l-lg" style={{backgroundColor: '#4A7C59'}}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </button>
                <button className="p-2 text-gray-600 rounded-r-lg hover:bg-gray-100">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Grille des voitures */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {searchResults.slice(0, 8).map((car) => (
              <CarCard key={car.id} {...car} viewMode="grid" />
            ))}
          </div>

          {/* Bouton Voir plus */}
          <div className="text-center">
            <Button variant="outline" size="lg" className="w-full sm:w-auto px-6 sm:px-8">
              <Car className="h-4 w-4 mr-2" />
              Voir toutes les voitures ({searchResults.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-6 sm:py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Catégories Populaires</h2>
            <p className="text-sm sm:text-base text-gray-600">
              Trouvez le véhicule parfait selon vos besoins
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-4 sm:pt-6">
                <Car className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" style={{color: '#4A7C59'}} />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Berlines</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Confort et élégance</p>
                <Badge variant="secondary" className="text-xs">245 annonces</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-4 sm:pt-6">
                <Car className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" style={{color: '#4A7C59'}} />
                <h3 className="text-base sm:text-lg font-semibold mb-2">SUV</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Aventure et famille</p>
                <Badge variant="secondary" className="text-xs">189 annonces</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-4 sm:pt-6">
                <Car className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" style={{color: '#4A7C59'}} />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Pick-up</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Travail et robustesse</p>
                <Badge variant="secondary" className="text-xs">156 annonces</Badge>
              </CardContent>
            </Card>
            
            <Card className="text-center p-4 sm:p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-4 sm:pt-6">
                <Car className="h-8 w-8 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" style={{color: '#4A7C59'}} />
                <h3 className="text-base sm:text-lg font-semibold mb-2">Compactes</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">Économie et agilité</p>
                <Badge variant="secondary" className="text-xs">312 annonces</Badge>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Recent Listings */}
      <section className="py-6 sm:py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Annonces Récentes</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Les dernières voitures ajoutées sur AutoLink
              </p>
            </div>
            <Button variant="outline" className="w-full sm:w-auto">
              Voir toutes les nouveautés
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {searchResults.slice(0, 6).map((car) => (
              <CarCard key={car.id} {...car} viewMode="grid" />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-6 sm:py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Pourquoi choisir AutoLink ?</h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-4">
              Nous rendons l'achat, la vente et la location de voitures simples, sûres et transparentes.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
              <Shield className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Véhicules vérifiés</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Toutes les voitures passent par une inspection approfondie et une vérification pour garantir qualité et sécurité.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg">
              <Clock className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Processus rapide</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Finalisez votre transaction en quelques minutes avec notre processus d'achat et de vente simplifié.
              </p>
            </div>
            
            <div className="text-center p-4 sm:p-6 bg-gray-50 rounded-lg sm:col-span-2 lg:col-span-1">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-primary mx-auto mb-3 sm:mb-4" />
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-gray-900">Service de confiance</h3>
              <p className="text-sm sm:text-base text-gray-600">
                Rejoignez des milliers de clients satisfaits qui nous font confiance pour leurs besoins automobiles.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-6 sm:py-8 md:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-6 sm:p-12 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 sm:mb-4">Prêt à commencer ?</h2>
            <p className="text-base sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
              Que vous souhaitiez acheter, vendre ou louer, nous sommes là pour vous accompagner à chaque étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button size="lg" className="w-full sm:w-auto bg-primary text-white hover:bg-primary/90">
                Voir toutes les voitures
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white">
                Nous contacter
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
