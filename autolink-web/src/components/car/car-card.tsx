import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Fuel, Users, Calendar, MapPin, Star, Heart, Eye, ShoppingCart, Clock } from "lucide-react"

interface CarCardProps {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  fuelType: string
  transmission: string
  seats: number
  imageUrl: string
  isRental?: boolean
  rentalPricePerDay?: number
  viewMode?: "grid" | "list"
}

export function CarCard({
  id,
  make,
  model,
  year,
  price,
  mileage,
  fuelType,
  transmission,
  seats,
  imageUrl,
  isRental = false,
  rentalPricePerDay,
  viewMode = "grid"
}: CarCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const formatMileage = (mileage: number) => {
    return new Intl.NumberFormat('fr-FR').format(mileage) + ' km'
  }

  return (
    <Card className={`w-full bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200 hover:border-primary/20 ${
      viewMode === "grid" ? "h-full flex flex-col" : "flex flex-row"
    }`}>
      <div className={`${viewMode === "grid" ? "flex flex-col h-full" : "flex flex-row w-full"}`}>
        {/* Image Section */}
        <div className={`relative ${
          viewMode === "grid" 
            ? "w-full h-36 sm:h-40 md:h-48 flex-shrink-0" 
            : "w-40 sm:w-48 md:w-64 h-28 sm:h-32 md:h-40 flex-shrink-0"
        }`}>
          <Image
            src={imageUrl}
            alt={`${year} ${make} ${model}`}
            fill
            className="object-cover"
          />
          <div className="absolute top-1 sm:top-2 md:top-3 left-1 sm:left-2 md:left-3 flex gap-1 sm:gap-2">
            <Badge className={`text-white text-xs flex items-center gap-1 ${
              isRental 
                ? "bg-[#262626] hover:bg-[#1a1a1a]" 
                : "bg-[#ff8900] hover:bg-[#e67a00]"
            }`}>
              {isRental ? (
                <>
                  <Clock className="h-3 w-3" />
                  <span className="hidden sm:inline">Location</span>
                  <span className="sm:hidden">Loc.</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="h-3 w-3" />
                  <span className="hidden sm:inline">Vente</span>
                  <span className="sm:hidden">Vente</span>
                </>
              )}
            </Badge>
            <Badge variant="secondary" className="text-xs hidden sm:flex">
              Garantie
            </Badge>
          </div>
          <div className="absolute top-1 sm:top-2 md:top-3 right-1 sm:right-2 md:right-3 flex gap-1">
            <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white">
              <Heart className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className={`${viewMode === "grid" ? "p-2 sm:p-3 md:p-4 flex-1 flex flex-col" : "p-2 sm:p-3 md:p-4 flex-1 flex flex-col justify-between"}`}>
          {/* Header */}
          <div className="flex justify-between items-start mb-2 sm:mb-3">
            <div className="flex-1">
              <h3 className={`font-semibold text-gray-900 mb-1 leading-tight ${
                viewMode === "grid" ? "text-base sm:text-lg" : "text-lg sm:text-xl"
              }`}>
                {year} {make} {model}
              </h3>
              <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>Dakar, Sénégal</span>
              </div>
            </div>
            <div className="text-right ml-2 flex-shrink-0">
              <div className={`font-bold text-primary ${
                viewMode === "grid" ? "text-lg sm:text-xl" : "text-xl sm:text-2xl"
              }`} style={{color: '#4A7C59'}}>
                {isRental ? `${formatPrice(rentalPricePerDay || 0)}/jour` : formatPrice(price)}
              </div>
              {!isRental && (
                <div className="text-xs sm:text-sm text-gray-500">
                  Prix négociable
                </div>
              )}
            </div>
          </div>

          {/* Specifications */}
          <div className={`grid gap-2 sm:gap-3 mb-3 sm:mb-4 ${
            viewMode === "grid" ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
          }`}>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Fuel className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <span>{fuelType}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <span>{transmission}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
              <Users className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
              <span>{seats} places</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              {formatMileage(mileage)}
            </div>
          </div>

          {/* Dealer Info */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">LC</span>
              </div>
              <div>
                <div className="text-xs sm:text-sm font-medium text-gray-900">AutoLink Dakar</div>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-gray-600">4.8 (127 avis)</span>
                </div>
              </div>
            </div>
            <Badge variant="outline" className="text-xs hidden sm:flex">
              Professionnel
            </Badge>
          </div>

          {/* Actions */}
          <div className={`flex gap-2 ${viewMode === "grid" ? "mt-auto" : ""}`}>
            <Link href={`/cars/${id}`}>
              <Button variant="outline" size="sm" className="flex-1 w-full cursor-pointer text-xs sm:text-sm">
                <Eye className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Voir l'annonce</span>
                <span className="sm:hidden">Voir</span>
              </Button>
            </Link>
            <Link href={`/cars/${id}`}>
              <Button 
                size="sm" 
                className={`flex-1 w-full cursor-pointer text-xs sm:text-sm ${
                  isRental 
                    ? "bg-[#262626] hover:bg-[#1a1a1a] text-white" 
                    : "bg-[#ff8900] hover:bg-[#e67a00] text-white"
                }`}
              >
                {isRental ? (
                  <>
                    <Clock className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Réserver</span>
                    <span className="sm:hidden">Réserver</span>
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Acheter</span>
                    <span className="sm:hidden">Acheter</span>
                  </>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

