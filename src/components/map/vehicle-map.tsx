"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Car, Eye, RotateCcw } from "lucide-react"

// Import dynamique pour éviter les erreurs SSR
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), {
  ssr: false,
  loading: () => <div className="h-48 sm:h-64 lg:h-80 bg-gray-100 rounded-lg flex items-center justify-center text-sm">Chargement de la carte...</div>
})

const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), {
  ssr: false
})

const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), {
  ssr: false
})

const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false
})

interface VehicleMapProps {
  vehicles: Array<{
    id: string
    make: string
    model: string
    year: number
    price: number
    city: string
    isRental?: boolean
    rentalPricePerDay?: number
  }>
  filters?: {
    make?: string
    model?: string
    city?: string
    type?: "sale" | "rental" | "all"
    minPrice?: string
    maxPrice?: string
    minYear?: string
    maxYear?: string
    fuelType?: string
    transmission?: string
    maxMileage?: string
  }
  onCityClick?: (city: string) => void
  onFiltersChange?: (filters: any) => void
}

interface CityData {
  name: string
  coordinates: [number, number]
  vehicleCount: number
  vehicles: Array<{
    id: string
    make: string
    model: string
    year: number
    price: number
    isRental?: boolean
    rentalPricePerDay?: number
  }>
}

export function VehicleMap({ vehicles, filters, onCityClick, onFiltersChange }: VehicleMapProps) {
  const [cityData, setCityData] = useState<CityData[]>([])
  const [isClient, setIsClient] = useState(false)
  const [mapCenter, setMapCenter] = useState<[number, number]>([14.5, -16.0])
  const [mapZoom, setMapZoom] = useState(7)
  const [icons, setIcons] = useState<{ [key: string]: any }>({})

  // Coordonnées des principales villes du Sénégal
  const cityCoordinates: Record<string, [number, number]> = {
    "Dakar": [14.7167, -17.4677],
    "Thiès": [14.7833, -16.9167],
    "Kaolack": [14.1500, -16.0833],
    "Ziguinchor": [12.5833, -16.2667],
    "Saint-Louis": [16.0167, -16.5000],
    "Diourbel": [14.6667, -16.2333],
    "Tambacounda": [13.7667, -13.6667],
    "Mbour": [14.4167, -16.9667],
    "Rufisque": [14.7167, -17.2667],
    "Kolda": [12.8833, -14.9500]
  }

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Créer les icônes quand cityData change
  useEffect(() => {
    const createIcons = async () => {
      const newIcons: { [key: string]: any } = {}
      for (const city of cityData) {
        newIcons[city.name] = await createCustomIcon(city)
      }
      setIcons(newIcons)
    }
    
    if (cityData.length > 0) {
      createIcons()
    }
  }, [cityData])

  // Zoom automatique sur la ville sélectionnée
  useEffect(() => {
    if (filters?.city && filters.city !== "all") {
      const cityCoords = cityCoordinates[filters.city]
      if (cityCoords) {
        setMapCenter(cityCoords)
        setMapZoom(10) // Zoom plus proche sur la ville
      }
    } else {
      // Retour au zoom général sur le Sénégal
      setMapCenter([14.5, -16.0])
      setMapZoom(7)
    }
  }, [filters?.city])

  useEffect(() => {
    // Appliquer les filtres aux véhicules
    let filteredVehicles = vehicles

    if (filters) {
      // Filtrer par marque
      if (filters.make && filters.make !== "all") {
        filteredVehicles = filteredVehicles.filter(car => 
          car.make.toLowerCase().includes(filters.make!.toLowerCase())
        )
      }

      // Filtrer par modèle
      if (filters.model && filters.model !== "all") {
        filteredVehicles = filteredVehicles.filter(car => 
          car.model.toLowerCase().includes(filters.model!.toLowerCase())
        )
      }

      // Filtrer par ville
      if (filters.city && filters.city !== "all") {
        filteredVehicles = filteredVehicles.filter(car => 
          car.city.toLowerCase().includes(filters.city!.toLowerCase())
        )
      }

      // Filtrer par type (vente/location)
      if (filters.type && filters.type !== "all") {
        if (filters.type === "sale") {
          filteredVehicles = filteredVehicles.filter(car => !car.isRental)
        } else if (filters.type === "rental") {
          filteredVehicles = filteredVehicles.filter(car => car.isRental)
        }
      }

      // Filtrer par prix
      if (filters.minPrice && filters.minPrice !== "all") {
        const minPrice = parseInt(filters.minPrice.replace(/\D/g, ''))
        filteredVehicles = filteredVehicles.filter(car => {
          const price = car.isRental ? car.rentalPricePerDay || 0 : car.price
          return price >= minPrice
        })
      }

      if (filters.maxPrice && filters.maxPrice !== "all") {
        const maxPrice = parseInt(filters.maxPrice.replace(/\D/g, ''))
        filteredVehicles = filteredVehicles.filter(car => {
          const price = car.isRental ? car.rentalPricePerDay || 0 : car.price
          return price <= maxPrice
        })
      }
    }

    // Grouper les véhicules filtrés par ville
    const groupedByCity = filteredVehicles.reduce((acc, vehicle) => {
      const city = vehicle.city || "Dakar" // Ville par défaut
      if (!acc[city]) {
        acc[city] = []
      }
      acc[city].push(vehicle)
      return acc
    }, {} as Record<string, typeof filteredVehicles>)

    // Créer les données de ville avec coordonnées
    const cities: CityData[] = Object.entries(groupedByCity).map(([cityName, cityVehicles]) => ({
      name: cityName,
      coordinates: cityCoordinates[cityName] || [14.7167, -17.4677], // Coordonnées par défaut (Dakar)
      vehicleCount: cityVehicles.length,
      vehicles: cityVehicles
    }))

    setCityData(cities)
  }, [vehicles, filters])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Créer une icône personnalisée avec le nombre de véhicules
  const createCustomIcon = async (city: CityData) => {
    const L = await import('leaflet')
    const saleCount = city.vehicles.filter(v => !v.isRental).length
    const rentalCount = city.vehicles.filter(v => v.isRental).length
    
    if (city.vehicleCount === 0) {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: #6B7280;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            0
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }

    // Si on filtre par type spécifique
    if (filters?.type === "sale") {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: #4A7C59;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            ${saleCount}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    } else if (filters?.type === "rental") {
      return L.divIcon({
        className: 'custom-div-icon',
        html: `
          <div style="
            background-color: #2563EB;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          ">
            ${rentalCount}
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
      })
    }

    // Vue mixte : afficher les deux nombres
    return L.divIcon({
      className: 'custom-div-icon',
      html: `
        <div style="
          background-color: #4A7C59;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 2px solid white;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          color: white;
          font-size: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.3);
          position: relative;
        ">
          <div style="display: flex; align-items: center; gap: 1px;">
            <span style="color: #4A7C59; background: white; border-radius: 50%; width: 10px; height: 10px; display: flex; align-items: center; justify-content: center; font-size: 7px;">${saleCount}</span>
            <span style="color: #2563EB; background: white; border-radius: 50%; width: 10px; height: 10px; display: flex; align-items: center; justify-content: center; font-size: 7px;">${rentalCount}</span>
          </div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    })
  }

  if (!isClient) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Carte des Véhicules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
            Chargement de la carte...
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            <CardTitle>Carte des Véhicules</CardTitle>
          </div>
          {onFiltersChange && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (onFiltersChange) {
                  onFiltersChange({
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
                }
              }}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
        <p className="text-sm text-gray-600">
          Cliquez sur les marqueurs pour voir les véhicules disponibles dans chaque ville
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-80 rounded-lg overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: "100%", width: "100%" }}
            className="z-0"
            key={`${mapCenter[0]}-${mapCenter[1]}-${mapZoom}`} // Force re-render quand centre/zoom change
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {cityData.map((city) => (
              <Marker key={city.name} position={city.coordinates} icon={icons[city.name]}>
                <Popup>
                  <div className="p-2 min-w-[200px]">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h3 className="font-semibold text-sm">{city.name}</h3>
                    </div>
                    
                    <div className="mb-3">
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          <Car className="h-3 w-3 mr-1" />
                          {city.vehicles.filter(v => !v.isRental).length} à vendre
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                          <Car className="h-3 w-3 mr-1" />
                          {city.vehicles.filter(v => v.isRental).length} à louer
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {city.vehicles.slice(0, 5).map((vehicle) => (
                        <div key={vehicle.id} className="border-b border-gray-100 pb-2 last:border-b-0">
                          <div className="text-xs font-medium">
                            {vehicle.year} {vehicle.make} {vehicle.model}
                          </div>
                          <div className="text-xs text-gray-600">
                            {vehicle.isRental 
                              ? `${formatPrice(vehicle.rentalPricePerDay || 0)}/jour`
                              : formatPrice(vehicle.price)
                            }
                          </div>
                        </div>
                      ))}
                      
                      {city.vehicles.length > 5 && (
                        <div className="text-xs text-gray-500 text-center pt-1">
                          +{city.vehicles.length - 5} autres véhicules
                        </div>
                      )}
                    </div>

                    {onCityClick && (
                      <button
                        onClick={() => {
                          onCityClick(city.name)
                          if (onFiltersChange) {
                            onFiltersChange({ ...filters, city: city.name })
                          }
                        }}
                        className="w-full mt-2 px-3 py-1 bg-primary text-primary-foreground text-xs rounded hover:bg-primary/90 transition-colors cursor-pointer"
                      >
                        <Eye className="h-3 w-3 mr-1 inline" />
                        Voir tous les véhicules
                      </button>
                    )}
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        {/* Légende */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-semibold mb-2">Légende</h4>
          <div className="flex flex-wrap gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Véhicules à vendre</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Véhicules à louer</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span>Mixte (vente + location)</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3 text-gray-500" />
              <span>Cliquez pour voir les détails</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
