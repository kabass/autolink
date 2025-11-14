"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarCard } from "@/components/car/car-card"
import { Car, Heart, Filter, Grid, List } from "lucide-react"

// Données d'exemple de voitures favorites
const favoriteCars = [
  {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2020,
    price: 8500000,
    mileage: 45000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    location: "Dakar",
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    dealerName: "Auto Dakar",
    dealerRating: 4.8,
    isRental: false,
    isVerified: true,
    features: ["Climatisation", "Direction assistée", "ABS"],
    description: "Toyota Corolla en excellent état, très bien entretenue."
  },
  {
    id: "2",
    make: "Nissan",
    model: "Qashqai",
    year: 2019,
    price: 12000000,
    mileage: 62000,
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 7,
    location: "Thiès",
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    dealerName: "Nissan Thiès",
    dealerRating: 4.6,
    isRental: false,
    isVerified: true,
    features: ["4x4", "Climatisation", "GPS"],
    description: "Nissan Qashqai parfait pour les familles et les aventures."
  },
  {
    id: "3",
    make: "Hyundai",
    model: "Tucson",
    year: 2021,
    price: 15000000,
    mileage: 28000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    location: "Dakar",
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    dealerName: "Hyundai Sénégal",
    dealerRating: 4.9,
    isRental: false,
    isVerified: true,
    features: ["Climatisation", "Caméra de recul", "Bluetooth"],
    description: "Hyundai Tucson récente avec toutes les options modernes."
  }
]

export default function FavoritesPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("date")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Mes Favoris</h1>
              <p className="text-gray-600">
                {favoriteCars.length} véhicule{favoriteCars.length > 1 ? 's' : ''} sauvegardé{favoriteCars.length > 1 ? 's' : ''}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
              >
                <option value="date">Trier par date</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="year">Année récente</option>
              </select>
              <div className="flex border border-gray-300 rounded-lg">
                <button 
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-l-lg ${
                    viewMode === "grid" 
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  style={viewMode === "grid" ? {backgroundColor: '#4A7C59'} : {}}
                >
                  <Grid className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-r-lg ${
                    viewMode === "list" 
                      ? "bg-primary text-white" 
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                  style={viewMode === "list" ? {backgroundColor: '#4A7C59'} : {}}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {favoriteCars.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun favori</h3>
            <p className="text-gray-600 mb-6">
              Commencez à sauvegarder vos voitures préférées pour les retrouver facilement.
            </p>
            <Button className="bg-primary hover:bg-primary/90" style={{backgroundColor: '#4A7C59'}}>
              <Car className="h-4 w-4 mr-2" />
              Parcourir les voitures
            </Button>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}>
            {favoriteCars.map((car) => (
              <CarCard key={car.id} {...car} viewMode={viewMode} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
