"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { Search, Filter, Trash2, Eye, Calendar, MapPin, Car } from "lucide-react"

// Données d'exemple de recherches sauvegardées
const savedSearches = [
  {
    id: "1",
    name: "Toyota Corolla récente",
    filters: {
      make: "Toyota",
      model: "Corolla",
      minYear: 2020,
      maxPrice: 10000000,
      city: "Dakar"
    },
    resultsCount: 12,
    lastSearch: "2024-01-15T10:30:00Z",
    isActive: true
  },
  {
    id: "2",
    name: "SUV 4x4 Dakar",
    filters: {
      type: "SUV",
      minYear: 2018,
      maxPrice: 15000000,
      city: "Dakar",
      fuelType: "Diesel"
    },
    resultsCount: 8,
    lastSearch: "2024-01-14T15:45:00Z",
    isActive: true
  },
  {
    id: "3",
    name: "Voitures économiques",
    filters: {
      maxPrice: 5000000,
      fuelType: "Essence",
      city: "Thiès"
    },
    resultsCount: 25,
    lastSearch: "2024-01-13T09:20:00Z",
    isActive: false
  }
]

export default function SearchesPage() {
  const [searches, setSearches] = useState(savedSearches)
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à vos recherches sauvegardées.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleDeleteSearch = (searchId: string) => {
    setSearches(searches.filter(search => search.id !== searchId))
  }

  const handleToggleActive = (searchId: string) => {
    setSearches(searches.map(search => 
      search.id === searchId 
        ? { ...search, isActive: !search.isActive }
        : search
    ))
  }

  const activeSearches = searches.filter(search => search.isActive)
  const inactiveSearches = searches.filter(search => !search.isActive)

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mes Recherches</h1>
              <p className="text-gray-600">Gérez vos recherches sauvegardées</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {activeSearches.length} actives
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{searches.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#ff8900]">{activeSearches.length}</div>
              <div className="text-sm text-gray-600">Actives</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#262626]">
                {searches.reduce((sum, search) => sum + search.resultsCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Résultats trouvés</div>
            </CardContent>
          </Card>
        </div>

        {/* Active Searches */}
        {activeSearches.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-[#ff8900]" />
              Recherches Actives ({activeSearches.length})
            </h2>
            <div className="grid gap-4">
              {activeSearches.map((search) => (
                <Card key={search.id} className="border-[#ffd9b3] bg-[#fff5e6]">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg">{search.name}</h3>
                          <Badge variant="default" className="text-xs bg-[#ff8900]">
                            Active
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(search.filters).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Car className="h-4 w-4" />
                            {search.resultsCount} résultats
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(search.lastSearch).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir résultats
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleActive(search.id)}
                        >
                          Désactiver
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteSearch(search.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Inactive Searches */}
        {inactiveSearches.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Search className="h-5 w-5 text-gray-400" />
              Recherches Inactives ({inactiveSearches.length})
            </h2>
            <div className="grid gap-4">
              {inactiveSearches.map((search) => (
                <Card key={search.id} className="border-gray-200">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg text-gray-700">{search.name}</h3>
                          <Badge variant="secondary" className="text-xs">
                            Inactive
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {Object.entries(search.filters).map(([key, value]) => (
                            <Badge key={key} variant="outline" className="text-xs text-gray-500">
                              {key}: {value}
                            </Badge>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Car className="h-4 w-4" />
                            {search.resultsCount} résultats
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(search.lastSearch).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir résultats
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleToggleActive(search.id)}
                        >
                          Activer
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-red-600"
                          onClick={() => handleDeleteSearch(search.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {searches.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune recherche sauvegardée</h3>
              <p className="text-gray-600 mb-6">
                Vous n'avez pas encore de recherches sauvegardées. 
                Commencez par rechercher des véhicules sur notre site.
              </p>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Commencer une recherche
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
