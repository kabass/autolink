"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Car, 
  DollarSign, 
  Shield, 
  Clock, 
  CheckCircle, 
  Upload,
  Phone,
  Mail,
  MapPin,
  Star,
  ShoppingCart,
  Calendar
} from "lucide-react"

export default function PostPage() {
  const [adType, setAdType] = useState<"sale" | "rental">("sale")
  
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    mileage: "",
    price: "",
    rentalPricePerDay: "",
    rentalPricePerWeek: "",
    rentalPricePerMonth: "",
    condition: "",
    description: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    availableFrom: "",
    availableTo: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Déposer une Annonce</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vendez ou louez votre véhicule facilement avec notre plateforme de confiance.
            Nous vous connectons avec des acheteurs et locataires vérifiés.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Benefits */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Pourquoi Choisir AutoLink ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">
                      {adType === "sale" ? "Meilleur Prix du Marché" : "Tarifs Compétitifs"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {adType === "sale" 
                        ? "Recevez des offres compétitives de plusieurs acheteurs vérifiés"
                        : "Fixez vos tarifs et recevez des demandes de locataires vérifiés"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Transactions Sécurisées</h4>
                    <p className="text-sm text-muted-foreground">
                      {adType === "sale" 
                        ? "Paiements protégés et vérification des acheteurs"
                        : "Caution sécurisée et vérification des locataires"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">
                      {adType === "sale" ? "Vente Rapide" : "Location Flexible"}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {adType === "sale" 
                        ? "Vendez votre voiture en quelques jours, pas en mois"
                        : "Louez selon vos disponibilités et vos conditions"
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Annonce Gratuite</h4>
                    <p className="text-sm text-muted-foreground">
                      Aucun frais d'annonce ou de charges cachées
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Informations de Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+221 33 123 45 67</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>vente@autolink.sn</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Dakar, Sénégal</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {/* Type Selection */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Type d'Annonce</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <Button
                    variant={adType === "sale" ? "default" : "outline"}
                    onClick={() => setAdType("sale")}
                    className={`flex-1 py-6 ${
                      adType === "sale" 
                        ? "bg-green-600 hover:bg-green-700 text-white" 
                        : "hover:bg-green-50 hover:text-green-700 hover:border-green-300"
                    }`}
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Vendre</div>
                      <div className="text-sm opacity-90">Vente définitive</div>
                    </div>
                  </Button>
                  <Button
                    variant={adType === "rental" ? "default" : "outline"}
                    onClick={() => setAdType("rental")}
                    className={`flex-1 py-6 ${
                      adType === "rental" 
                        ? "bg-blue-600 hover:bg-blue-700 text-white" 
                        : "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    }`}
                  >
                    <Calendar className="h-5 w-5 mr-2" />
                    <div className="text-left">
                      <div className="font-semibold">Louer</div>
                      <div className="text-sm opacity-90">Location temporaire</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {adType === "sale" ? "Informations du Véhicule à Vendre" : "Informations du Véhicule à Louer"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Basic Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Marque *</label>
                      <Input
                        placeholder="ex: Toyota, BMW"
                        value={formData.make}
                        onChange={(e) => handleInputChange("make", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Modèle *</label>
                      <Input
                        placeholder="ex: Camry, X5"
                        value={formData.model}
                        onChange={(e) => handleInputChange("model", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Année *</label>
                      <Input
                        type="number"
                        placeholder="2020"
                        value={formData.year}
                        onChange={(e) => handleInputChange("year", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Kilométrage *</label>
                      <Input
                        type="number"
                        placeholder="50000"
                        value={formData.mileage}
                        onChange={(e) => handleInputChange("mileage", e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Prix selon le type d'annonce */}
                    {adType === "sale" ? (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prix de Vente *</label>
                        <Input
                          type="number"
                          placeholder="25000"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          required
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Prix par Jour *</label>
                        <Input
                          type="number"
                          placeholder="15000"
                          value={formData.rentalPricePerDay}
                          onChange={(e) => handleInputChange("rentalPricePerDay", e.target.value)}
                          required
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">État *</label>
                      <Input
                        placeholder="Excellent, Bon, Correct"
                        value={formData.condition}
                        onChange={(e) => handleInputChange("condition", e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Champs supplémentaires pour la location */}
                    {adType === "rental" && (
                      <>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix par Semaine</label>
                          <Input
                            type="number"
                            placeholder="100000"
                            value={formData.rentalPricePerWeek}
                            onChange={(e) => handleInputChange("rentalPricePerWeek", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Prix par Mois</label>
                          <Input
                            type="number"
                            placeholder="400000"
                            value={formData.rentalPricePerMonth}
                            onChange={(e) => handleInputChange("rentalPricePerMonth", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Disponible du *</label>
                          <Input
                            type="date"
                            value={formData.availableFrom}
                            onChange={(e) => handleInputChange("availableFrom", e.target.value)}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Disponible jusqu'au</label>
                          <Input
                            type="date"
                            value={formData.availableTo}
                            onChange={(e) => handleInputChange("availableTo", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Lieu de Récupération *</label>
                          <Input
                            placeholder="Dakar, Sénégal"
                            value={formData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            required
                          />
                        </div>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-input rounded-md resize-none"
                      placeholder="Décrivez les caractéristiques de votre véhicule, son historique et toute information supplémentaire..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>

                  {/* Photos */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Photos</label>
                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Téléchargez des photos de votre véhicule
                      </p>
                      <Button variant="outline" size="sm">
                        Choisir des Fichiers
                      </Button>
                    </div>
                  </div>

                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Informations de Contact</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Nom Complet *</label>
                        <Input
                          placeholder="Jean Dupont"
                          value={formData.contactName}
                          onChange={(e) => handleInputChange("contactName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email *</label>
                        <Input
                          type="email"
                          placeholder="jean@exemple.com"
                          value={formData.contactEmail}
                          onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Numéro de Téléphone *</label>
                        <Input
                          type="tel"
                          placeholder="+221 33 123 45 67"
                          value={formData.contactPhone}
                          onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    {adType === "sale" ? "Publier Ma Voiture à Vendre" : "Publier Ma Voiture à Louer"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            {adType === "sale" ? "Processus de Vente" : "Processus de Location"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">
                {adType === "sale" ? "Listez Votre Voiture" : "Créez Votre Annonce"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {adType === "sale" 
                  ? "Créez une annonce détaillée avec photos et informations du véhicule."
                  : "Définissez vos tarifs et disponibilités avec photos et détails."
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">
                {adType === "sale" ? "Recevez des Offres" : "Recevez des Demandes"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {adType === "sale" 
                  ? "Recevez des offres compétitives d'acheteurs vérifiés dans les 24 heures."
                  : "Recevez des demandes de locataires vérifiés selon vos critères."
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">
                {adType === "sale" ? "Planifiez l'Inspection" : "Planifiez la Remise"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {adType === "sale" 
                  ? "Organisez un moment convenable pour l'inspection du véhicule et l'essai."
                  : "Organisez la remise des clés et la vérification du véhicule."
                }
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">
                {adType === "sale" ? "Finalisez la Vente" : "Gérez la Location"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {adType === "sale" 
                  ? "Finalisez la transaction avec un paiement sécurisé et la documentation."
                  : "Suivez la location et récupérez votre véhicule à la fin du contrat."
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
