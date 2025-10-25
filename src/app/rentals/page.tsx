"use client"

import { useState } from "react"
import { CarCard } from "@/components/car/car-card"
import { SearchFilters, SearchFilters as SearchFiltersType } from "@/components/search/search-filters"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Car, Clock, Shield, Star, Calendar } from "lucide-react"

// Données de voitures de location
const rentalCars = [
  {
    id: "2",
    make: "BMW",
    model: "X5",
    year: 2023,
    price: 0,
    mileage: 8000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 7,
    imageUrl: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 35000
  },
  {
    id: "4",
    make: "Honda",
    model: "Civic",
    year: 2021,
    price: 0,
    mileage: 25000,
    fuelType: "Essence",
    transmission: "Manuelle",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 25000
  },
  {
    id: "6",
    make: "Mercedes-Benz",
    model: "Classe C",
    year: 2022,
    price: 0,
    mileage: 18000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 150
  },
  {
    id: "8",
    make: "Nissan",
    model: "Altima",
    year: 2021,
    price: 0,
    mileage: 30000,
    fuelType: "Gasoline",
    transmission: "CVT",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 70
  },
  {
    id: "9",
    make: "Toyota",
    model: "RAV4",
    year: 2023,
    price: 0,
    mileage: 10000,
    fuelType: "Hybrid",
    transmission: "CVT",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 90
  },
  {
    id: "10",
    make: "Chevrolet",
    model: "Malibu",
    year: 2022,
    price: 0,
    mileage: 20000,
    fuelType: "Gasoline",
    transmission: "Automatic",
    seats: 5,
    imageUrl: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    isRental: true,
    rentalPricePerDay: 75
  }
]

export default function RentalsPage() {
  const [searchResults, setSearchResults] = useState(rentalCars)

  const handleSearch = (filters: SearchFiltersType) => {
    let filtered = rentalCars

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
      filtered = filtered.filter(car => 
        (car.rentalPricePerDay || 0) >= parseInt(filters.minPrice)
      )
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(car => 
        (car.rentalPricePerDay || 0) <= parseInt(filters.maxPrice)
      )
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
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Location de Voitures</h1>
          <p className="text-muted-foreground text-lg">
            Louez une voiture pour votre prochain voyage avec des options flexibles et des tarifs compétitifs
          </p>
        </div>

        {/* Rental Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Location Flexible</h3>
              <p className="text-muted-foreground">
                Louez pour des heures, des jours ou des semaines sans engagement à long terme.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Sécurisé</h3>
              <p className="text-muted-foreground">
                Toutes les locations incluent une protection complète pour votre tranquillité.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <Star className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Flotte de Qualité</h3>
              <p className="text-muted-foreground">
                Véhicules bien entretenus avec inspections et nettoyage réguliers.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <SearchFilters onSearch={handleSearch} />
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <Badge variant="secondary" className="text-sm">
            {searchResults.length} véhicules de location disponibles
          </Badge>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>Available for immediate rental</span>
          </div>
        </div>

        {/* Results */}
        {searchResults.length === 0 ? (
          <div className="text-center py-12">
            <Car className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No rental cars found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search filters to find available rental vehicles.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {searchResults.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
          </div>
        )}

        {/* Rental Process */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Choose Your Car</h3>
              <p className="text-sm text-muted-foreground">
                Browse our fleet and select the perfect vehicle for your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Book Online</h3>
              <p className="text-sm text-muted-foreground">
                Complete your booking with our secure online reservation system.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Pick Up</h3>
              <p className="text-sm text-muted-foreground">
                Collect your vehicle at our convenient pickup location.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Enjoy Your Trip</h3>
              <p className="text-sm text-muted-foreground">
                Drive with confidence knowing you have 24/7 roadside assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

