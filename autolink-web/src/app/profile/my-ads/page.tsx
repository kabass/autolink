"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarCard } from "@/components/car/car-card"
import { useAuth } from "@/contexts/AuthContext"
import { Car, Plus, Edit, Eye, Trash2, Filter, Grid, List } from "lucide-react"

// Données d'exemple d'annonces de l'utilisateur
const userAds = [
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
    status: "active"
  },
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
    rentalPricePerDay: 45000,
    status: "pending"
  }
]

export default function MyAdsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterStatus, setFilterStatus] = useState("all")
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté et avoir les permissions de vendeur pour accéder à cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user?.permissions?.canSell) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Permissions insuffisantes</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être vendeur pour accéder à cette page. 
                <a href="/become-seller" className="text-primary hover:underline ml-1">
                  Devenir vendeur
                </a>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const filteredAds = filterStatus === "all" 
    ? userAds 
    : userAds.filter(ad => ad.status === filterStatus)

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mes Annonces</h1>
              <p className="text-gray-600">Gérez vos annonces de véhicules</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouvelle annonce
            </Button>
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            <select 
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">Toutes les annonces</option>
              <option value="active">Actives</option>
              <option value="pending">En attente</option>
              <option value="sold">Vendues</option>
              <option value="draft">Brouillons</option>
            </select>
          </div>
          
          <div className="flex gap-2">
            <div className="flex border border-gray-300 rounded-lg">
              <button 
                className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button 
                className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-100"}`}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{userAds.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#ff8900]">
                {userAds.filter(ad => ad.status === "active").length}
              </div>
              <div className="text-sm text-gray-600">Actives</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {userAds.filter(ad => ad.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-[#262626]">
                {userAds.filter(ad => ad.status === "sold").length}
              </div>
              <div className="text-sm text-gray-600">Vendues</div>
            </CardContent>
          </Card>
        </div>

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune annonce</h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all" 
                  ? "Vous n'avez pas encore d'annonces."
                  : `Aucune annonce avec le statut "${filterStatus}".`
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer ma première annonce
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1"
          }`}>
            {filteredAds.map((ad) => (
              <Card key={ad.id} className="relative">
                <CardContent className="p-0">
                  <div className={`${viewMode === "grid" ? "flex flex-col" : "flex flex-row"}`}>
                    {/* Image */}
                    <div className={`relative ${
                      viewMode === "grid" 
                        ? "w-full h-48" 
                        : "w-64 h-40 flex-shrink-0"
                    }`}>
                      <img 
                        src={ad.imageUrl} 
                        alt={`${ad.year} ${ad.make} ${ad.model}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge 
                          variant={ad.status === "active" ? "default" : "secondary"}
                          className="text-xs"
                        >
                          {ad.status === "active" && "Active"}
                          {ad.status === "pending" && "En attente"}
                          {ad.status === "sold" && "Vendue"}
                          {ad.status === "draft" && "Brouillon"}
                        </Badge>
                      </div>
                    </div>

                    {/* Content */}
                    <div className={`${viewMode === "grid" ? "p-4" : "p-4 flex-1"}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">
                            {ad.year} {ad.make} {ad.model}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <span>{ad.mileage.toLocaleString()} km</span>
                            <span>{ad.fuelType}</span>
                            <span>{ad.transmission}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-primary text-xl">
                            {ad.isRental 
                              ? `${ad.rentalPricePerDay?.toLocaleString()} FCFA/jour`
                              : `${ad.price.toLocaleString()} FCFA`
                            }
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
