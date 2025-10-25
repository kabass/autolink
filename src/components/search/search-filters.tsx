"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, Filter, X, ChevronDown, ShoppingCart, Calendar, RotateCcw } from "lucide-react"

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void
  initialFilters?: Partial<SearchFilters>
  onAdvancedFiltersToggle?: (isOpen: boolean) => void
}

export interface SearchFilters {
  make: string
  model: string
  city: string
  maxMileage: string
  minPrice: string
  maxPrice: string
  fuelType: string
  transmission: string
  minYear: string
  maxYear: string
  type: "sale" | "rental" | "all"
}

export function SearchFilters({ onSearch, initialFilters, onAdvancedFiltersToggle }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    make: initialFilters?.make || "",
    model: initialFilters?.model || "",
    city: initialFilters?.city || "all",
    maxMileage: initialFilters?.maxMileage || "all",
    minPrice: initialFilters?.minPrice || "",
    maxPrice: initialFilters?.maxPrice || "",
    fuelType: initialFilters?.fuelType || "",
    transmission: initialFilters?.transmission || "",
    minYear: initialFilters?.minYear || "",
    maxYear: initialFilters?.maxYear || "",
    type: initialFilters?.type || "all"
  })

  const [isExpanded, setIsExpanded] = useState(false)
  const [showMakeSuggestions, setShowMakeSuggestions] = useState(false)
  const [showModelSuggestions, setShowModelSuggestions] = useState(false)
  const [showCitySuggestions, setShowCitySuggestions] = useState(false)
  const [makeSuggestions, setMakeSuggestions] = useState<string[]>([])
  const [modelSuggestions, setModelSuggestions] = useState<string[]>([])
  const [citySuggestions, setCitySuggestions] = useState<string[]>([])
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1)
  
  const makeInputRef = useRef<HTMLInputElement>(null)
  const modelInputRef = useRef<HTMLInputElement>(null)
  const cityInputRef = useRef<HTMLInputElement>(null)

  // Mettre à jour les filtres quand initialFilters change
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        make: initialFilters.make || "",
        model: initialFilters.model || "",
        city: initialFilters.city || "all",
        maxMileage: initialFilters.maxMileage || "all",
        minPrice: initialFilters.minPrice || "",
        maxPrice: initialFilters.maxPrice || "",
        fuelType: initialFilters.fuelType || "",
        transmission: initialFilters.transmission || "",
        minYear: initialFilters.minYear || "",
        maxYear: initialFilters.maxYear || "",
        type: initialFilters.type || "all"
      })
    }
  }, [initialFilters])

  // Notifier le parent quand les filtres avancés sont ouverts/fermés
  useEffect(() => {
    if (onAdvancedFiltersToggle) {
      onAdvancedFiltersToggle(isExpanded)
    }
  }, [isExpanded, onAdvancedFiltersToggle])

  // Données d'autocomplétion
  const makeOptions = ["Toyota", "Peugeot", "Renault", "Hyundai", "Mercedes-Benz", "Kia", "Nissan", "Ford", "BMW", "Audi"]
  const modelOptions = {
    "Toyota": ["Corolla", "Hilux", "Camry", "RAV4", "Prius"],
    "Peugeot": ["3008", "208", "308", "5008", "2008"],
    "Renault": ["Duster", "Clio", "Megane", "Kadjar", "Captur"],
    "Hyundai": ["Tucson", "i20", "i30", "Santa Fe", "Elantra"],
    "Mercedes-Benz": ["Classe C", "Classe A", "Classe E", "GLC", "CLA"],
    "Kia": ["Sportage", "Picanto", "Ceed", "Sorento", "Stonic"],
    "Nissan": ["Qashqai", "Navara", "Micra", "Juke", "X-Trail"],
    "Ford": ["Ranger", "Focus", "Fiesta", "Kuga", "Mondeo"],
    "BMW": ["Série 3", "Série 1", "X3", "X5", "Série 5"],
    "Audi": ["A3", "A4", "Q5", "Q7", "A6"]
  }
  const cityOptions = ["Dakar", "Thiès", "Kaolack", "Ziguinchor", "Saint-Louis", "Diourbel", "Tambacounda", "Mbour", "Rufisque", "Kolda"]

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    
    // Gérer l'autocomplétion pour les modèles quand la marque change
    if (key === "make") {
      const models = modelOptions[value as keyof typeof modelOptions] || []
      setModelSuggestions(models)
      setShowModelSuggestions(models.length > 0)
    }
  }

  const handleMakeInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, make: value }))
    setSelectedSuggestionIndex(-1)
    
    if (value.length > 0) {
      const suggestions = makeOptions.filter(make => 
        make.toLowerCase().includes(value.toLowerCase())
      )
      setMakeSuggestions(suggestions)
      setShowMakeSuggestions(suggestions.length > 0)
    } else {
      setMakeSuggestions([])
      setShowMakeSuggestions(false)
    }
  }

  const handleModelInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, model: value }))
    setSelectedSuggestionIndex(-1)
    
    if (value.length > 0 && filters.make) {
      const models = modelOptions[filters.make as keyof typeof modelOptions] || []
      const suggestions = models.filter(model => 
        model.toLowerCase().includes(value.toLowerCase())
      )
      setModelSuggestions(suggestions)
      setShowModelSuggestions(suggestions.length > 0)
    } else {
      setModelSuggestions([])
      setShowModelSuggestions(false)
    }
  }

  const handleCityInputChange = (value: string) => {
    setFilters(prev => ({ ...prev, city: value }))
    setSelectedSuggestionIndex(-1)
    
    if (value.length > 0) {
      const suggestions = cityOptions.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      )
      setCitySuggestions(suggestions)
      setShowCitySuggestions(suggestions.length > 0)
    } else {
      setCitySuggestions([])
      setShowCitySuggestions(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent, type: 'make' | 'model' | 'city') => {
    const suggestions = type === 'make' ? makeSuggestions : type === 'model' ? modelSuggestions : citySuggestions
    const showSuggestions = type === 'make' ? showMakeSuggestions : type === 'model' ? showModelSuggestions : showCitySuggestions
    
    if (!showSuggestions || suggestions.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedSuggestionIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (selectedSuggestionIndex >= 0 && selectedSuggestionIndex < suggestions.length) {
          selectSuggestion(type, suggestions[selectedSuggestionIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        if (type === 'make') {
          setShowMakeSuggestions(false)
        } else if (type === 'model') {
          setShowModelSuggestions(false)
        } else if (type === 'city') {
          setShowCitySuggestions(false)
        }
        setSelectedSuggestionIndex(-1)
        break
    }
  }

  const selectSuggestion = (type: 'make' | 'model' | 'city', value: string) => {
    if (type === 'make') {
      setFilters(prev => ({ ...prev, make: value, model: "" }))
      setMakeSuggestions([])
      setShowMakeSuggestions(false)
      // Réinitialiser les suggestions de modèles
      setModelSuggestions([])
      setShowModelSuggestions(false)
      // Si on sélectionne une marque, préparer les modèles disponibles
      const models = modelOptions[value as keyof typeof modelOptions] || []
      if (models.length > 0) {
        setModelSuggestions(models)
      }
    } else if (type === 'model') {
      setFilters(prev => ({ ...prev, model: value }))
      setModelSuggestions([])
      setShowModelSuggestions(false)
    } else if (type === 'city') {
      setFilters(prev => ({ ...prev, city: value }))
      setCitySuggestions([])
      setShowCitySuggestions(false)
    }
    setSelectedSuggestionIndex(-1)
  }

  // Fermer les suggestions quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      
      // Vérifier si le clic est en dehors des inputs et de leurs suggestions
      if (makeInputRef.current && !makeInputRef.current.contains(target)) {
        // Vérifier aussi si le clic n'est pas sur une suggestion
        const suggestionElement = target as Element
        if (!suggestionElement.closest('.absolute.z-20')) {
          setShowMakeSuggestions(false)
        }
      }
      if (modelInputRef.current && !modelInputRef.current.contains(target)) {
        const suggestionElement = target as Element
        if (!suggestionElement.closest('.absolute.z-20')) {
          setShowModelSuggestions(false)
        }
      }
      if (cityInputRef.current && !cityInputRef.current.contains(target)) {
        const suggestionElement = target as Element
        if (!suggestionElement.closest('.absolute.z-20')) {
          setShowCitySuggestions(false)
        }
      }
    }

    // Utiliser un délai pour éviter les conflits avec onMouseDown
    const timeoutId = setTimeout(() => {
      document.addEventListener('mousedown', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearch = () => {
    onSearch(filters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      make: "",
      model: "",
      city: "all",
      maxMileage: "all",
      minPrice: "",
      maxPrice: "",
      fuelType: "",
      transmission: "",
      minYear: "",
      maxYear: "",
      type: "all"
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const activeFiltersCount = Object.values(filters).filter(value => 
    value !== "" && value !== "all"
  ).length

  return (
    <div className="w-full">
      {/* Main Search Section */}
      <div className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 mb-3 sm:mb-4">
        {/* Type Selection */}
        <div className="mb-3 sm:mb-4">
          <label className="text-xs font-medium text-gray-700 mb-2 block">Je cherche à :</label>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              variant={filters.type === "all" ? "default" : "outline"}
              onClick={() => handleFilterChange("type", "all")}
              className={`px-3 py-2 text-xs ${
                filters.type === "all" 
                  ? "bg-primary text-white" 
                  : "hover:bg-gray-50"
              }`}
            >
              <Search className="h-3 w-3 mr-1" />
              Tout
            </Button>
            <Button
              variant={filters.type === "sale" ? "default" : "outline"}
              onClick={() => handleFilterChange("type", "sale")}
              className={`px-3 py-2 text-xs ${
                filters.type === "sale" 
                  ? "bg-green-600 text-white hover:bg-green-700" 
                  : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
              }`}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Acheter
            </Button>
            <Button
              variant={filters.type === "rental" ? "default" : "outline"}
              onClick={() => handleFilterChange("type", "rental")}
              className={`px-3 py-2 text-xs ${
                filters.type === "rental" 
                  ? "bg-blue-600 text-white hover:bg-blue-700" 
                  : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              }`}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Louer
            </Button>
          </div>
        </div>

        {/* Main Search Fields */}
        <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
          {/* Make */}
          <div className="space-y-1 relative">
            <label className="text-xs font-medium text-gray-700">Marque</label>
            <div className="relative">
              <Input
                ref={makeInputRef}
                placeholder="Toutes les marques"
                value={filters.make}
                onChange={(e) => handleMakeInputChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'make')}
                className="h-9 sm:h-10 text-sm"
              />
              {showMakeSuggestions && makeSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                  {makeSuggestions.map((make, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 cursor-pointer text-xs border-b border-gray-100 last:border-b-0 ${
                        index === selectedSuggestionIndex 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        selectSuggestion('make', make)
                      }}
                    >
                      {make}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Model */}
          <div className="space-y-1 relative">
            <label className="text-xs font-medium text-gray-700">Modèle</label>
            <div className="relative">
              <Input
                ref={modelInputRef}
                placeholder="Tous les modèles"
                value={filters.model}
                onChange={(e) => handleModelInputChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'model')}
                className="h-9 sm:h-10 text-sm"
              />
              {showModelSuggestions && modelSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                  {modelSuggestions.map((model, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 cursor-pointer text-xs border-b border-gray-100 last:border-b-0 ${
                        index === selectedSuggestionIndex 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        selectSuggestion('model', model)
                      }}
                    >
                      {model}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* City */}
          <div className="space-y-1 relative">
            <label className="text-xs font-medium text-gray-700">Ville</label>
            <div className="relative">
              <Input
                ref={cityInputRef}
                placeholder="Toutes les villes"
                value={filters.city === "all" ? "" : filters.city}
                onChange={(e) => handleCityInputChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'city')}
                className="h-9 sm:h-10 text-sm"
              />
              {showCitySuggestions && citySuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-32 overflow-y-auto">
                  <div
                    className={`px-2 py-1 cursor-pointer text-xs border-b border-gray-100 ${
                      -1 === selectedSuggestionIndex 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'hover:bg-gray-100'
                    }`}
                    onMouseDown={(e) => {
                      e.preventDefault()
                      selectSuggestion('city', 'all')
                    }}
                  >
                    Toutes les villes
                  </div>
                  {citySuggestions.map((city, index) => (
                    <div
                      key={index}
                      className={`px-2 py-1 cursor-pointer text-xs border-b border-gray-100 last:border-b-0 ${
                        index === selectedSuggestionIndex 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'hover:bg-gray-100'
                      }`}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        selectSuggestion('city', city)
                      }}
                    >
                      {city}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-1">
            <label className="text-xs font-medium text-gray-700">Prix</label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Minimum"
                value={filters.minPrice}
                onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                className="h-9 sm:h-10 text-sm"
              />
              <Input
                type="number"
                placeholder="Maximum"
                value={filters.maxPrice}
                onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                className="h-9 sm:h-10 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Search Button - Only show here when advanced filters are closed */}
        {!isExpanded && (
          <div className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleSearch} className="px-4 sm:px-6 py-2 bg-primary hover:bg-primary/90 text-sm flex-1">
              <Search className="h-4 w-4 mr-2" />
              Rechercher
            </Button>
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="px-4 py-2 text-sm"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
          </div>
        )}

        {/* Advanced Filters Section */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
            <Button 
              variant="ghost" 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-1 text-xs font-medium text-gray-700 hover:text-primary p-0 h-auto"
            >
              <Filter className="h-3 w-3" />
              Filtres avancés
              <ChevronDown className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
            
            {activeFiltersCount > 0 && (
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs px-2 py-0.5">
                  {activeFiltersCount}
                </Badge>
                <Button variant="outline" size="sm" onClick={clearFilters} className="text-xs px-2 py-1 h-auto">
                  <X className="h-3 w-3 mr-1" />
                  Effacer
                </Button>
              </div>
            )}
          </div>

          {isExpanded && (
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="space-y-2 sm:space-y-3">
                {/* Year Range */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Année</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      placeholder="Minimum"
                      value={filters.minYear}
                      onChange={(e) => handleFilterChange("minYear", e.target.value)}
                      className="h-8 sm:h-10 text-sm"
                    />
                    <Input
                      type="number"
                      placeholder="Maximum"
                      value={filters.maxYear}
                      onChange={(e) => handleFilterChange("maxYear", e.target.value)}
                      className="h-8 sm:h-10 text-sm"
                    />
                  </div>
                </div>

                {/* Fuel Type */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Carburant</label>
                  <Select value={filters.fuelType} onValueChange={(value) => handleFilterChange("fuelType", value)}>
                    <SelectTrigger className="h-8 sm:h-10 text-sm">
                      <SelectValue placeholder="Tous les carburants" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Tous les carburants</SelectItem>
                      <SelectItem value="Essence">Essence</SelectItem>
                      <SelectItem value="Diesel">Diesel</SelectItem>
                      <SelectItem value="Hybride">Hybride</SelectItem>
                      <SelectItem value="Électrique">Électrique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Transmission */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Transmission</label>
                  <Select value={filters.transmission} onValueChange={(value) => handleFilterChange("transmission", value)}>
                    <SelectTrigger className="h-8 sm:h-10 text-sm">
                      <SelectValue placeholder="Toutes les transmissions" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Toutes les transmissions</SelectItem>
                      <SelectItem value="Manuelle">Manuelle</SelectItem>
                      <SelectItem value="Automatique">Automatique</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Mileage */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Kilométrage max</label>
                  <Select value={filters.maxMileage} onValueChange={(value) => handleFilterChange("maxMileage", value)}>
                    <SelectTrigger className="h-8 sm:h-10 text-sm">
                      <SelectValue placeholder="Indifférent" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-gray-200 shadow-lg z-50">
                      <SelectItem value="all">Indifférent</SelectItem>
                      <SelectItem value="50000">50 000 km</SelectItem>
                      <SelectItem value="100000">100 000 km</SelectItem>
                      <SelectItem value="150000">150 000 km</SelectItem>
                      <SelectItem value="200000">200 000 km</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {/* Search Button - Show at bottom when advanced filters are open */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button onClick={handleSearch} className="px-4 sm:px-6 py-2 bg-primary hover:bg-primary/90 text-sm flex-1">
                  <Search className="h-4 w-4 mr-2" />
                  Rechercher
                </Button>
                <Button 
                  onClick={clearFilters} 
                  variant="outline" 
                  className="px-4 py-2 text-sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Réinitialiser
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

