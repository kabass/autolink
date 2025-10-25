"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { CarCard } from "@/components/car/car-card"
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/search/search-filters"
import { VehicleMap } from "@/components/map/vehicle-map"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Filter, Grid, List, Map } from "lucide-react"

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
    isRental: false,
    city: "Dakar"
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
    rentalPricePerDay: 35000,
    city: "Thiès"
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
    isRental: false,
    city: "Dakar"
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
    rentalPricePerDay: 25000,
    city: "Kaolack"
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
    isRental: false,
    city: "Dakar"
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
    rentalPricePerDay: 45000,
    city: "Saint-Louis"
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
    isRental: false,
    city: "Dakar"
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
    rentalPricePerDay: 30000,
    city: "Ziguinchor"
  }
]

export default function CarsPage() {
  const [searchResults, setSearchResults] = useState(sampleCars)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showMap, setShowMap] = useState(false)
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false)
  const [currentFilters, setCurrentFilters] = useState<SearchFiltersType>({
    make: "",
    model: "",
    city: "all",
    maxMileage: "all",
    type: "all",
    minPrice: "",
    maxPrice: "",
    minYear: "",
    maxYear: "",
    fuelType: "",
    transmission: ""
  })
  const searchParams = useSearchParams()
  
  // Appliquer les filtres depuis l'URL au chargement de la page
  useEffect(() => {
    const urlFilters: SearchFiltersType = {
      make: searchParams.get("make") || "",
      model: searchParams.get("model") || "",
      maxMileage: searchParams.get("maxMileage") || "all",
      city: searchParams.get("city") || "all",
      type: (searchParams.get("type") as "all" | "sale" | "rental") || "all",
      fuelType: "",
      transmission: "",
      minPrice: "",
      maxPrice: "",
      minYear: "",
      maxYear: ""
    }
    
    // Appliquer les filtres si des paramètres sont présents
    if (urlFilters.make || urlFilters.model || urlFilters.maxMileage || urlFilters.city || searchParams.get("query")) {
      setCurrentFilters(urlFilters)
      handleSearch(urlFilters)
    }
  }, [searchParams])

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = sampleCars
    
    // Recherche générique par query
    const genericQuery = searchParams.get("query")
    if (genericQuery) {
      filtered = filtered.filter(car => {
        const searchText = `${car.make} ${car.model} ${car.year} ${car.fuelType} ${car.transmission}`.toLowerCase()
        return searchText.includes(genericQuery.toLowerCase())
      })
    }

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

    // Filtre par kilométrage maximum
    if (filters.maxMileage && filters.maxMileage !== "all") {
      const maxMileage = parseInt(filters.maxMileage.replace(/\D/g, '')) // Extraire les chiffres
      filtered = filtered.filter(car => car.mileage <= maxMileage)
    }

    // Filtre par ville (simulation - dans une vraie app, ce serait dans les données)
    if (filters.city && filters.city !== "all") {
      // Pour la démo, on simule que tous les véhicules sont à Dakar
      // Dans une vraie application, chaque véhicule aurait une propriété city
      filtered = filtered.filter(car => {
        // Simulation : certains véhicules sont dans différentes villes
        const cityMapping: { [key: string]: string[] } = {
          "Dakar": ["1", "2", "3", "4", "5", "6", "7", "8"],
          "Thiès": ["3", "5"],
          "Kaolack": ["4", "6"],
          "Ziguinchor": ["7", "8"],
          "Saint-Louis": ["1", "2"]
        }
        return cityMapping[filters.city]?.includes(car.id) || false
      })
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
    setCurrentFilters(filters)
  }

  const handleCityClick = (city: string) => {
    // Filtrer les résultats par ville
    const cityVehicles = sampleCars.filter(car => 
      car.city.toLowerCase().includes(city.toLowerCase())
    )
    setSearchResults(cityVehicles)
    setShowMap(false) // Retourner à la vue liste
    
    // Mettre à jour les filtres avec la ville sélectionnée
    const updatedFilters = { ...currentFilters, city: city }
    setCurrentFilters(updatedFilters)
    
    // Déclencher la recherche avec les nouveaux filtres
    handleSearch(updatedFilters)
  }

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setCurrentFilters(newFilters)
    handleSearch(newFilters)
  }

  const saleCars = searchResults.filter(car => !car.isRental)
  const rentalCars = searchResults.filter(car => car.isRental)

  return (
    <div className="min-h-screen py-4 sm:py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4">Parcourir Toutes les Voitures</h1>
          <p className="text-muted-foreground text-sm sm:text-base lg:text-lg">
            Découvrez notre inventaire complet de véhicules de qualité
          </p>
        </div>

        {/* Layout: Formulaire à gauche, Carte à droite */}
        <div className={`flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8 ${isAdvancedFiltersOpen ? 'items-end' : 'items-start'}`}>
          {/* Formulaire de recherche - Colonne gauche */}
          <div className="w-full lg:w-2/5">
            <SearchFilters 
              onSearch={handleSearch} 
              initialFilters={currentFilters}
              onAdvancedFiltersToggle={setIsAdvancedFiltersOpen}
            />
          </div>

          {/* Carte interactive - Colonne droite */}
          <div className="w-full lg:w-3/5">
            <VehicleMap 
              vehicles={sampleCars} 
              filters={currentFilters}
              onCityClick={handleCityClick} 
              onFiltersChange={handleFiltersChange}
            />
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <Badge variant="secondary" className="text-xs sm:text-sm self-start">
              {searchResults.length} véhicules trouvés
            </Badge>
            <div className="flex gap-2">
              <Badge variant="outline" className="text-xs sm:text-sm">
                {saleCars.length} à vendre
              </Badge>
              <Badge variant="outline" className="text-xs sm:text-sm">
                {rentalCars.length} à louer
              </Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="px-2 sm:px-3"
            >
              <Grid className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="px-2 sm:px-3"
            >
              <List className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
            <Button
              variant={showMap ? "default" : "outline"}
              size="sm"
              onClick={() => setShowMap(!showMap)}
              className="px-2 sm:px-3"
            >
              <Map className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Results */}
        {searchResults.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Car className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Aucune voiture trouvée</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Essayez d'ajuster vos filtres de recherche pour trouver plus de véhicules.
            </p>
          </div>
        ) : (
          <div className={`grid gap-4 sm:gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {searchResults.map((car) => (
              <CarCard key={car.id} {...car} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

