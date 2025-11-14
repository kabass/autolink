"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { CarCard } from "@/components/car/car-card"
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/search/search-filters"
import { VehicleMap } from "@/components/map/vehicle-map"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Grid, List, Map } from "lucide-react"
import { apiClient, mapApiVehicleToVehicle } from "@/lib/api"

function CarsPageContent() {
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
  const [totalElements, setTotalElements] = useState(0)
  const [currentPage, setCurrentPage] = useState(0)
  const searchParams = useSearchParams()
  
  // Charger les véhicules au montage et quand les filtres changent
  useEffect(() => {
    loadVehicles()
  }, [currentFilters, currentPage])

  // Appliquer les filtres depuis l'URL au chargement de la page
  useEffect(() => {
    const urlFilters: SearchFiltersType = {
      make: searchParams.get("make") || "",
      model: searchParams.get("model") || "",
      maxMileage: searchParams.get("maxMileage") || "all",
      city: searchParams.get("city") || "all",
      type: (searchParams.get("type") as "all" | "sale" | "rental") || "all",
      fuelType: searchParams.get("fuelType") || "",
      transmission: searchParams.get("transmission") || "",
      minPrice: searchParams.get("minPrice") || "",
      maxPrice: searchParams.get("maxPrice") || "",
      minYear: searchParams.get("minYear") || "",
      maxYear: searchParams.get("maxYear") || ""
    }
    
    // Appliquer les filtres si des paramètres sont présents
    if (urlFilters.make || urlFilters.model || urlFilters.maxMileage || urlFilters.city || searchParams.get("query")) {
      setCurrentFilters(urlFilters)
    } else {
      loadVehicles()
    }
  }, [searchParams])

  const loadVehicles = async () => {
    setIsLoading(true)
    try {
      const query = searchParams.get("query") || currentFilters.make || currentFilters.model || ""
      
      const searchParams_api: any = {
        query: query || undefined,
        make: currentFilters.make || undefined,
        model: currentFilters.model || undefined,
        city: currentFilters.city && currentFilters.city !== "all" ? currentFilters.city : undefined,
        maxMileage: currentFilters.maxMileage && currentFilters.maxMileage !== "all" ? currentFilters.maxMileage : undefined,
        type: currentFilters.type && currentFilters.type !== "all" ? currentFilters.type : undefined,
        minPrice: currentFilters.minPrice || undefined,
        maxPrice: currentFilters.maxPrice || undefined,
        minYear: currentFilters.minYear || undefined,
        maxYear: currentFilters.maxYear || undefined,
        fuelType: currentFilters.fuelType ? currentFilters.fuelType.toUpperCase() : undefined,
        transmission: currentFilters.transmission ? currentFilters.transmission.toUpperCase() : undefined,
        page: currentPage,
        size: 20
      }

      // Nettoyer les paramètres undefined
      Object.keys(searchParams_api).forEach(key => {
        if (searchParams_api[key] === undefined || searchParams_api[key] === "") {
          delete searchParams_api[key]
        }
      })

      const response = await apiClient.searchVehicles(searchParams_api)
      const mappedVehicles = response.content.map(mapApiVehicleToVehicle)
      setSearchResults(mappedVehicles)
      setTotalElements(response.totalElements)
    } catch (error) {
      console.error("Error loading vehicles:", error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (filters: SearchFiltersType) => {
    setCurrentFilters(filters)
    setCurrentPage(0) // Reset to first page on new search
  }

  const handleCityClick = (city: string) => {
    const updatedFilters = { ...currentFilters, city: city }
    setCurrentFilters(updatedFilters)
    setCurrentPage(0)
    setShowMap(false)
  }

  const handleFiltersChange = (newFilters: SearchFiltersType) => {
    setCurrentFilters(newFilters)
    setCurrentPage(0)
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
              vehicles={searchResults} 
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
              {totalElements} véhicules trouvés
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
        {isLoading ? (
          <div className="text-center py-8 sm:py-12">
            <p className="text-gray-600">Chargement...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-8 sm:py-12">
            <Car className="h-8 w-8 sm:h-12 sm:w-12 text-muted-foreground mx-auto mb-3 sm:mb-4" />
            <h3 className="text-base sm:text-lg font-semibold mb-2">Aucune voiture trouvée</h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Essayez d'ajuster vos filtres de recherche pour trouver plus de véhicules.
            </p>
          </div>
        ) : (
          <>
            <div className={`grid gap-4 sm:gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                : "grid-cols-1"
            }`}>
              {searchResults.map((car) => (
                <CarCard key={car.id} {...car} viewMode={viewMode} />
              ))}
            </div>
            
            {/* Pagination */}
            {totalElements > 20 && (
              <div className="flex justify-center gap-2 mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                >
                  Précédent
                </Button>
                <span className="flex items-center px-4">
                  Page {currentPage + 1} sur {Math.ceil(totalElements / 20)}
                </span>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(currentPage + 1)}
                  disabled={currentPage >= Math.ceil(totalElements / 20) - 1}
                >
                  Suivant
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function CarsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p className="text-gray-600">Chargement...</p>
    </div>}>
      <CarsPageContent />
    </Suspense>
  )
}
