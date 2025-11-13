"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Interactive3DPhoto } from "@/components/car/interactive-3d-photo"
import { 
  Car, 
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
  CreditCard,
  Key
} from "lucide-react"

// Base de données des véhicules avec photos spécifiques
const vehicleDatabase = {
  "1": {
    id: "1",
    make: "Toyota",
    model: "Corolla",
    year: 2022,
    price: 8500000,
    mileage: 15000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    doors: 4,
    color: "Blanc",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1549317336-206569e8475c?w=800&h=600&fit=crop&q=80", // Vue avant - Toyota Corolla
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop&q=80", // Vue côté - Toyota Corolla
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&h=600&fit=crop&q=80", // Vue arrière - Toyota Corolla
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80", // Intérieur - Toyota Corolla
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop&q=80"  // Moteur - Toyota Corolla
    ],
  },
  "2": {
    id: "2",
    make: "Toyota",
    model: "Hilux",
    year: 2023,
    price: 0,
    mileage: 8000,
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    doors: 4,
    color: "Gris",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", // Vue avant
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // Vue côté
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", // Vue arrière
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop", // Intérieur
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop"  // Moteur
    ],
  },
  "3": {
    id: "3",
    make: "Peugeot",
    model: "3008",
    year: 2023,
    price: 12000000,
    mileage: 5000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    doors: 5,
    color: "Noir",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", // Vue avant
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop", // Vue côté
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", // Vue arrière
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // Intérieur
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop"  // Moteur
    ],
  },
  "4": {
    id: "4",
    make: "Renault",
    model: "Duster",
    year: 2021,
    price: 0,
    mileage: 25000,
    fuelType: "Diesel",
    transmission: "Manuelle",
    seats: 5,
    doors: 5,
    color: "Rouge",
    condition: "Très bon",
    images: [
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop", // Vue avant
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", // Vue côté
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // Vue arrière
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", // Intérieur
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop"  // Moteur
    ],
  },
  "5": {
    id: "5",
    make: "Hyundai",
    model: "Tucson",
    year: 2023,
    price: 9500000,
    mileage: 12000,
    fuelType: "Essence",
    transmission: "Automatique",
    seats: 5,
    doors: 5,
    color: "Bleu",
    condition: "Excellent",
    images: [
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&h=600&fit=crop", // Vue avant
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800&h=600&fit=crop", // Vue côté
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&h=600&fit=crop", // Vue arrière
      "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&h=600&fit=crop", // Intérieur
      "https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=800&h=600&fit=crop"  // Moteur
    ],
  }
}

// Fonction pour obtenir les données du véhicule basées sur l'ID
function getVehicleData(id: string) {
  const baseData = vehicleDatabase[id as keyof typeof vehicleDatabase] || vehicleDatabase["1"]
  
  // Ajouter les données communes à tous les véhicules
  return {
    ...baseData,
    videos: [
      "https://example.com/video1.mp4",
      "https://example.com/video2.mp4"
    ],
    description: `Véhicule en excellent état, parfaitement entretenu. Première main, tous les entretiens effectués chez le concessionnaire officiel ${baseData.make}. 

Caractéristiques principales :
- Système de navigation intégré
- Climatisation automatique
- Vitres électriques
- Rétroviseurs électriques
- Système audio Bluetooth
- Airbags frontaux et latéraux
- ABS et ESP
- Contrôle de stabilité

Le véhicule n'a jamais eu d'accident et dispose de tous ses papiers en règle. Contrôle technique valide jusqu'en 2025.

Idéal pour une famille ou pour un usage professionnel. Consommation raisonnable et fiabilité ${baseData.make} garantie.`,
    features: [
      "Climatisation automatique",
      "Système de navigation",
      "Bluetooth",
      "Vitres électriques",
      "Rétroviseurs électriques",
      "Airbags multiples",
      "ABS",
      "ESP",
      "Contrôle de stabilité",
      "Régulateur de vitesse",
      "Ordinateur de bord",
      "Radio CD/MP3"
    ],
    seller: {
      name: "AutoLink Dakar",
      phone: "+221 33 123 45 67",
      email: "contact@autolink.sn",
      rating: 4.8,
      reviews: 127,
      verified: true,
      location: "Dakar, Sénégal",
      memberSince: "2020"
    },
    isRental: parseInt(id) % 2 === 0, // IDs pairs = location, impairs = vente
    rentalPricePerDay: parseInt(id) % 2 === 0 ? 35000 : null,
    rentalPricePerWeek: parseInt(id) % 2 === 0 ? 200000 : null,
    rentalPricePerMonth: parseInt(id) % 2 === 0 ? 700000 : null,
    availableFrom: parseInt(id) % 2 === 0 ? "2024-02-01" : null,
    availableTo: parseInt(id) % 2 === 0 ? "2024-12-31" : null,
    pickupLocation: parseInt(id) % 2 === 0 ? "Dakar, Sénégal" : null,
    publishedDate: "2024-01-15",
    views: 245,
    favorites: 18
  }
}

export default function VehicleDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [show3DView, setShow3DView] = useState(false)
  
  // Déballer les params avec React.use()
  const { id } = use(params)
  
  // Obtenir les données du véhicule basées sur l'ID
  const adaptedVehicleData = getVehicleData(id)

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
    <div className="min-h-screen py-4 sm:py-6 md:py-8 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-6">
          <div className="flex items-center space-x-1 sm:space-x-2 text-xs sm:text-sm text-gray-600">
            <Link href="/" className="hover:text-primary">Accueil</Link>
            <span>/</span>
            <Link href="/cars" className="hover:text-primary">Voitures</Link>
            <span>/</span>
            <span className="text-gray-900 truncate">{adaptedVehicleData.year} {adaptedVehicleData.make} {adaptedVehicleData.model}</span>
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
                    images={adaptedVehicleData.images}
                    vehicleName={`${adaptedVehicleData.year} ${adaptedVehicleData.make} ${adaptedVehicleData.model}`}
                    className="w-full"
                  />
                ) : (
                  /* Vue 2D Traditionnelle */
                  <>
                    {/* Image principale */}
                    <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-100 rounded-t-lg overflow-hidden">
                  <Image
                    src={adaptedVehicleData.images[selectedImage]}
                    alt={`${adaptedVehicleData.year} ${adaptedVehicleData.make} ${adaptedVehicleData.model}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4 flex gap-1 sm:gap-2">
                    <Badge className={`text-white flex items-center gap-1 text-xs sm:text-sm ${
                      adaptedVehicleData.isRental 
                        ? "bg-[#262626] hover:bg-[#1a1a1a]" 
                        : "bg-[#ff8900] hover:bg-[#e67a00]"
                    }`}>
                      {adaptedVehicleData.isRental ? (
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
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`h-3 w-3 sm:h-4 sm:w-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-6 w-6 sm:h-8 sm:w-8 p-0 bg-white/80 hover:bg-white">
                      <Share2 className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                    </div>

                    {/* Miniatures */}
                    <div className="p-3 sm:p-4">
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-1 sm:gap-2">
                    {adaptedVehicleData.images.map((image, index) => (
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
                  
                  {/* Vidéos */}
                  {adaptedVehicleData.videos.length > 0 && (
                    <div className="mt-3 sm:mt-4">
                      <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                        <Play className="h-3 w-3 sm:h-4 sm:w-4" />
                        Vidéos
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {adaptedVehicleData.videos.map((video, index) => (
                          <div key={index} className="relative h-16 sm:h-20 md:h-24 bg-gray-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                            </div>
                            <div className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 text-xs text-white bg-black/50 px-1 py-0.5 sm:px-2 sm:py-1 rounded">
                              Vidéo {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            <Card className="mt-4 sm:mt-6">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 whitespace-pre-line text-sm sm:text-base leading-relaxed">{adaptedVehicleData.description}</p>
              </CardContent>
            </Card>

            {/* Caractéristiques */}
            <Card className="mt-4 sm:mt-6">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg md:text-xl">Caractéristiques</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                  {adaptedVehicleData.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-[#ff8900]" />
                      <span className="text-xs sm:text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Informations et Contact */}
          <div className="space-y-4 sm:space-y-6">
            {/* Prix et Infos principales */}
            <Card>
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className={`text-xl sm:text-2xl md:text-3xl font-bold mb-2 ${
                    adaptedVehicleData.isRental ? 'text-[#262626]' : 'text-[#ff8900]'
                  }`}>
                    {adaptedVehicleData.isRental 
                      ? `${formatPrice(adaptedVehicleData.rentalPricePerDay || 0)}/jour`
                      : formatPrice(adaptedVehicleData.price)
                    }
                  </div>
                  {adaptedVehicleData.isRental ? (
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">
                        {formatPrice(adaptedVehicleData.rentalPricePerWeek || 0)}/semaine
                      </p>
                      <p className="text-sm text-gray-600">
                        {formatPrice(adaptedVehicleData.rentalPricePerMonth || 0)}/mois
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Prix négociable</p>
                  )}
                </div>

                {/* Informations clés */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Année</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.year}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Kilométrage</span>
                    <span className="font-medium text-sm sm:text-base">{formatMileage(adaptedVehicleData.mileage)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Carburant</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.fuelType}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Boîte</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.transmission}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Places</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.seats}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Portes</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.doors}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">Couleur</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.color}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm text-gray-600">État</span>
                    <span className="font-medium text-sm sm:text-base">{adaptedVehicleData.condition}</span>
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Eye className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-600">Vues</span>
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{adaptedVehicleData.views}</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                      <span className="text-xs sm:text-sm text-gray-600">Favoris</span>
                    </div>
                    <div className="font-semibold text-sm sm:text-base">{adaptedVehicleData.favorites}</div>
                  </div>
                </div>

                {/* Boutons d'action */}
                <div className="space-y-2 sm:space-y-3">
                  <Button className={`w-full ${
                    adaptedVehicleData.isRental 
                      ? "bg-[#262626] hover:bg-[#1a1a1a] text-white" 
                      : "bg-[#ff8900] hover:bg-[#e67a00] text-white"
                  }`}>
                    {adaptedVehicleData.isRental ? (
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
                    adaptedVehicleData.isRental 
                      ? "border-[#262626] text-[#262626] hover:bg-[#262626] hover:text-white" 
                      : "border-[#ff8900] text-[#ff8900] hover:bg-[#ff8900] hover:text-white"
                  }`}>
                    <Phone className="h-4 w-4 mr-2" />
                    {adaptedVehicleData.isRental ? "Appeler le loueur" : "Appeler le vendeur"}
                  </Button>
                  <Button variant="outline" className={`w-full ${
                    adaptedVehicleData.isRental 
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
            {adaptedVehicleData.isRental && (
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
                    <div>
                      <h4 className="font-semibold mb-2">Disponibilités</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Disponible du</span>
                          <span className="font-medium">{adaptedVehicleData.availableFrom}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Disponible jusqu'au</span>
                          <span className="font-medium">{adaptedVehicleData.availableTo}</span>
                        </div>
                      </div>
                    </div>

                    {/* Lieu de récupération */}
                    <div>
                      <h4 className="font-semibold mb-2">Lieu de Récupération</h4>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#262626]" />
                        <span>{adaptedVehicleData.pickupLocation}</span>
                      </div>
                    </div>

                    {/* Tarifs détaillés */}
                    <div>
                      <h4 className="font-semibold mb-2">Tarifs</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Par jour</span>
                          <span className="font-medium text-[#262626]">
                            {formatPrice(adaptedVehicleData.rentalPricePerDay || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Par semaine</span>
                          <span className="font-medium text-[#262626]">
                            {formatPrice(adaptedVehicleData.rentalPricePerWeek || 0)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Par mois</span>
                          <span className="font-medium text-[#262626]">
                            {formatPrice(adaptedVehicleData.rentalPricePerMonth || 0)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Conditions de location */}
                    <div>
                      <h4 className="font-semibold mb-2">Conditions</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Caution de sécurité requise</li>
                        <li>• Permis de conduire valide obligatoire</li>
                        <li>• Assurance incluse</li>
                        <li>• Kilométrage illimité</li>
                        <li>• Livraison possible sur Dakar</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Informations vendeur */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  {adaptedVehicleData.isRental ? "Loueur vérifié" : "Vendeur vérifié"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-lg font-medium text-gray-600">AL</span>
                  </div>
                  <div>
                    <div className="font-semibold">{adaptedVehicleData.seller.name}</div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">
                        {adaptedVehicleData.seller.rating} ({adaptedVehicleData.seller.reviews} avis)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{adaptedVehicleData.seller.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>Membre depuis {adaptedVehicleData.seller.memberSince}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                    <span>Vendeur vérifié</span>
                  </div>
                </div>
              </CardContent>
            </Card>

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