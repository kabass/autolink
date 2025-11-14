"use client"

import { useState, use, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Interactive3DPhoto } from "@/components/car/interactive-3d-photo"
import { 
  Calendar, 
  Fuel, 
  Users, 
  MapPin, 
  Star, 
  Heart, 
  Share2, 
  Phone, 
  MessageCircle,
  Shield,
  CheckCircle,
  Clock,
  Eye,
  Camera,
  Play,
  ShoppingCart,
  Key
} from "lucide-react"
import { apiClient, mapApiVehicleToVehicle } from "@/lib/api"
import { useAuth } from "@/contexts/AuthContext"

export default function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [show3DView, setShow3DView] = useState(false)
  const [vehicle, setVehicle] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  
  // Déballer les params avec React.use()
  const { id } = use(params)
  
  useEffect(() => {
    loadVehicle()
  }, [id])

  useEffect(() => {
    if (vehicle && user) {
      checkFavorite()
    }
  }, [vehicle, user])

  const loadVehicle = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const vehicleId = parseInt(id)
      const apiVehicle = await apiClient.getVehicleById(vehicleId)
      const mappedVehicle = mapApiVehicleToVehicle(apiVehicle)
      
      // Enrichir avec des données supplémentaires si nécessaire
      const enrichedVehicle = {
        ...mappedVehicle,
        videos: [], // Pas encore implémenté dans l'API
        seller: {
          name: `${apiVehicle.userFirstName} ${apiVehicle.userLastName}`,
          phone: user?.phone || "+221 33 123 45 67",
          email: user?.email || "contact@autolink.sn",
          rating: 4.8,
          reviews: 127,
          verified: true,
          location: apiVehicle.city,
          memberSince: new Date(apiVehicle.createdAt).getFullYear().toString()
        },
        publishedDate: new Date(apiVehicle.createdAt).toISOString().split('T')[0]
      }
      
      setVehicle(enrichedVehicle)
      
      // Incrémenter les vues
      await apiClient.incrementViews(vehicleId)
    } catch (err: any) {
      console.error("Error loading vehicle:", err)
      setError(err.message || "Erreur lors du chargement du véhicule")
    } finally {
      setIsLoading(false)
    }
  }

  const checkFavorite = async () => {
    if (!user || !vehicle) return
    try {
      const favorite = await apiClient.isFavorite(parseInt(user.id), parseInt(vehicle.id))
      setIsFavorite(favorite)
    } catch (err) {
      console.error("Error checking favorite:", err)
    }
  }

  const toggleFavorite = async () => {
    if (!user || !vehicle) return
    try {
      if (isFavorite) {
        await apiClient.removeFavorite(parseInt(user.id), parseInt(vehicle.id))
      } else {
        await apiClient.addFavorite(parseInt(user.id), parseInt(vehicle.id))
      }
      setIsFavorite(!isFavorite)
    } catch (err) {
      console.error("Error toggling favorite:", err)
    }
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Chargement...</p>
      </div>
    )
  }

  if (error || !vehicle) {
    return (
      <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || "Véhicule non trouvé"}</p>
          <Link href="/cars">
            <Button>Retour à la liste</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-primary">Voitures</Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{vehicle.year} {vehicle.make} {vehicle.model}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {/* Images et Vidéos */}
          <div className="lg:col-span-2">
            {/* Bouton de basculement 3D visible */}
            <div className="mb-3 sm:mb-4 flex justify-center">
              <Button
                variant={show3DView ? "default" : "outline"}
                size="sm"
                className="text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-3"
                onClick={() => setShow3DView(!show3DView)}
              >
                <Camera className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{show3DView ? "Passer en Vue 2D" : "Activer la Vue 3D Interactive"}</span>
                <span className="sm:hidden">{show3DView ? "Vue 2D" : "Vue 3D"}</span>
              </Button>
            </div>
            <Card>
              <CardContent className="p-0">
                {/* Bouton pour basculer entre vue normale et 3D */}
                <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-30 flex gap-1 sm:gap-2">
                  <Button
                    variant={show3DView ? "default" : "outline"}
                    size="sm"
                    onClick={() => setShow3DView(!show3DView)}
                    className="bg-white/95 hover:bg-white shadow-lg text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  >
                    <Camera className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    <span className="hidden sm:inline">{show3DView ? "Vue 2D" : "Vue 3D"}</span>
                    <span className="sm:hidden">{show3DView ? "2D" : "3D"}</span>
                  </Button>
                </div>

                {show3DView ? (
                  /* Vue 3D Interactive */
                  <Interactive3DPhoto 
                    images={vehicle.images || [vehicle.imageUrl]}
                    vehicleName={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                    className="w-full"
                  />
                ) : (
                  /* Vue 2D Traditionnelle */
                  <>
                    {/* Image principale */}
                    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-t-lg overflow-hidden">
                      <Image
                        src={vehicle.images && vehicle.images.length > 0 ? vehicle.images[selectedImage] : vehicle.imageUrl}
                        alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-1 sm:gap-2">
                        <Badge className={`text-white flex items-center gap-1 text-xs sm:text-sm ${
                          vehicle.isRental 
                            ? "bg-[#262626] hover:bg-[#1a1a1a]" 
                            : "bg-[#ff8900] hover:bg-[#e67a00]"
                        }`}>
                          {vehicle.isRental ? (
                            <>
                              <Clock className="h-3 w-3" />
                              <span className="hidden sm:inline">Location</span>
                              <span className="sm:hidden">Loc</span>
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-3 w-3" />
                              <span className="hidden sm:inline">Vente</span>
                              <span className="sm:hidden">Vente</span>
                            </>
                          )}
                        </Badge>
                        <Badge variant="secondary" className="text-xs sm:text-sm">Garantie</Badge>
                      </div>
                      <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex gap-1 sm:gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white"
                          onClick={toggleFavorite}
                        >
                          <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white">
                          <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Miniatures */}
                    {vehicle.images && vehicle.images.length > 1 && (
                      <div className="p-3 sm:p-4">
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2">
                          {vehicle.images.map((image: string, index: number) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(index)}
                              className={`relative h-10 sm:h-12 md:h-16 rounded-lg overflow-hidden border-2 ${
                                selectedImage === index ? 'border-primary' : 'border-gray-200'
                              }`}
                            >
                              <Image
                                src={image}
                                alt={`Vue ${index + 1}`}
                                fill
                                className="object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {vehicle.description && (
              <Card className="mt-4 sm:mt-6">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg md:text-xl">Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base leading-relaxed">{vehicle.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Caractéristiques */}
            {vehicle.features && vehicle.features.length > 0 && (
              <Card className="mt-4 sm:mt-6">
                <CardHeader>
                  <CardTitle className="text-base sm:text-lg md:text-xl">Caractéristiques</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                    {vehicle.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8900]" />
                        <span className="text-xs sm:text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Informations et Contact */}
          <div className="space-y-4 sm:space-y-6">
            {/* Prix et Infos principales */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                    vehicle.isRental ? 'text-[#262626]' : 'text-[#ff8900]'
                  }`}>
                    {vehicle.isRental 
                      ? `${formatPrice(vehicle.rentalPricePerDay || 0)}/jour`
                      : formatPrice(vehicle.price)
                    }
                  </div>
                  {vehicle.isRental ? (
                    <div className="space-y-1">
                      {vehicle.rentalPricePerWeek && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(vehicle.rentalPricePerWeek)}/semaine
                        </p>
                      )}
                      {vehicle.rentalPricePerMonth && (
                        <p className="text-sm text-gray-600">
                          {formatPrice(vehicle.rentalPricePerMonth)}/mois
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Prix négociable</p>
                  )}
                </div>

                {/* Informations clés */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Année</span>
                    <span className="font-medium text-sm sm:text-base">{vehicle.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Kilométrage</span>
                    <span className="font-medium text-sm sm:text-base">{formatMileage(vehicle.mileage)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Carburant</span>
                    <span className="font-medium text-sm sm:text-base">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Boîte</span>
                    <span className="font-medium text-sm sm:text-base">{vehicle.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Places</span>
                    <span className="font-medium text-sm sm:text-base">{vehicle.seats}</span>
                  </div>
                  {vehicle.doors && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Portes</span>
                      <span className="font-medium text-sm sm:text-base">{vehicle.doors}</span>
                    </div>
                  )}
                  {vehicle.color && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">Couleur</span>
                      <span className="font-medium text-sm sm:text-base">{vehicle.color}</span>
                    </div>
                  )}
                  {vehicle.condition && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs sm:text-sm text-gray-600">État</span>
                      <span className="font-medium text-sm sm:text-base">{vehicle.condition}</span>
                    </div>
                  )}
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-600">Vues</span>
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{vehicle.views || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-600">Favoris</span>
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{vehicle.favoritesCount || 0}</div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-2 sm:space-y-3">
                  <Button className={`w-full ${
                    vehicle.isRental 
                      ? "bg-[#262626] hover:bg-[#1a1a1a] text-white" 
                      : "bg-[#ff8900] hover:bg-[#e67a00] text-white"
                  }`}>
                    {vehicle.isRental ? (
                      <>
                        <Key className="h-4 w-4 mr-2" />
                        Réserver maintenant
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Acheter maintenant
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className={`w-full ${
                    vehicle.isRental 
                      ? "border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white" 
                      : "border-[#ff8900] text-[#ff8900] hover:bg-[#ff8900] hover:text-white"
                  }`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {vehicle.isRental ? "Appeler le loueur" : "Appeler le vendeur"}
                  </Button>
                  <Button variant="outline" className={`w-full ${
                    vehicle.isRental 
                      ? "border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white" 
                      : "border-[#ff8900] text-[#ff8900] hover:bg-[#ff8900] hover:text-white"
                  }`}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Message privé
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informations de location - seulement pour les locations */}
            {vehicle.isRental && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#262626]" />
                    Informations de Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Disponibilités */}
                    {(vehicle.availableFrom || vehicle.availableTo) && (
                      <div>
                        <h4 className="font-semibold mb-2">Disponibilités</h4>
                        <div className="space-y-2">
                          {vehicle.availableFrom && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Disponible du</span>
                              <span className="font-medium">{vehicle.availableFrom}</span>
                            </div>
                          )}
                          {vehicle.availableTo && (
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-600">Disponible jusqu'au</span>
                              <span className="font-medium">{vehicle.availableTo}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Lieu de récupération */}
                    {vehicle.pickupLocation && (
                      <div>
                        <h4 className="font-semibold mb-2">Lieu de Récupération</h4>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-[#262626]" />
                          <span>{vehicle.pickupLocation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations vendeur */}
            {vehicle.seller && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    {vehicle.isRental ? "Loueur vérifié" : "Vendeur vérifié"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-lg font-medium text-gray-600">
                        {vehicle.seller.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-semibold">{vehicle.seller.name}</div>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">
                          {vehicle.seller.rating} ({vehicle.seller.reviews} avis)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{vehicle.seller.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>Membre depuis {vehicle.seller.memberSince}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                      <span>Vendeur vérifié</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Sécurité */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Sécurité
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                    <span>Vendeur vérifié</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                    <span>Véhicule inspecté</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                    <span>Garantie incluse</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                    <span>Paiement sécurisé</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
