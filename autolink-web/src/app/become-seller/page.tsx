"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Shield, 
  Star, 
  Users, 
  TrendingUp, 
  CheckCircle, 
  Crown,
  Zap,
  Target,
  Award,
  Phone,
  Mail,
  MapPin,
  Calendar,
  CreditCard,
  DollarSign
} from "lucide-react"

export default function BecomeSellerPage() {
  const [selectedPlan, setSelectedPlan] = useState("premium")
  const [formData, setFormData] = useState({
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    businessType: "",
    description: "",
    website: "",
    yearsExperience: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Seller application submitted:", formData, selectedPlan)
  }

  const plans = [
    {
      id: "basic",
      name: "Basique",
      price: 25000,
      period: "mois",
      description: "Parfait pour débuter",
      features: [
        "5 annonces simultanées",
        "Support par email",
        "Statistiques de base",
        "Profil vendeur standard"
      ],
      limitations: [
        "Pas de mise en avant",
        "Support limité"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      price: 50000,
      period: "mois",
      description: "Le plus populaire",
      popular: true,
      features: [
        "20 annonces simultanées",
        "Mise en avant des annonces",
        "Support prioritaire",
        "Statistiques avancées",
        "Profil vendeur vérifié",
        "Badge Premium"
      ],
      limitations: []
    },
    {
      id: "enterprise",
      name: "Entreprise",
      price: 100000,
      period: "mois",
      description: "Pour les professionnels",
      features: [
        "Annonces illimitées",
        "Mise en avant maximale",
        "Support dédié",
        "Statistiques complètes",
        "Profil vendeur premium",
        "Badge Entreprise",
        "API d'intégration",
        "Gestion multi-utilisateurs"
      ],
      limitations: []
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-SN', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Devenir Vendeur AutoLink</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Rejoignez notre réseau de vendeurs professionnels et augmentez vos ventes avec AutoLink Sénégal. 
            Choisissez l'abonnement qui correspond à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Avantages */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-primary" />
                  Pourquoi Choisir AutoLink ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Large Audience</h4>
                    <p className="text-sm text-muted-foreground">
                      Accédez à des milliers d'acheteurs potentiels au Sénégal
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Ventes Rapides</h4>
                    <p className="text-sm text-muted-foreground">
                      Vendez vos véhicules 3x plus rapidement qu'ailleurs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Sécurité</h4>
                    <p className="text-sm text-muted-foreground">
                      Transactions sécurisées et acheteurs vérifiés
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <h4 className="font-semibold">Support Expert</h4>
                    <p className="text-sm text-muted-foreground">
                      Équipe dédiée pour vous accompagner
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contact Commercial</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+221 33 123 45 67</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>commercial@autolink.sn</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Dakar, Sénégal</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span>Lun-Ven: 8h-18h</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Plans d'abonnement */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Choisissez Votre Abonnement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {plans.map((plan) => (
                    <div
                      key={plan.id}
                      className={`relative p-6 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedPlan === plan.id
                          ? 'border-primary bg-primary/5'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      {plan.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-white">
                          Populaire
                        </Badge>
                      )}
                      
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                        <div className="text-3xl font-bold text-primary mb-1" style={{color: '#4A7C59'}}>
                          {formatPrice(plan.price)}
                        </div>
                        <div className="text-sm text-gray-500">par {plan.period}</div>
                        <p className="text-sm text-gray-600 mt-2">{plan.description}</p>
                      </div>

                      <div className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-[#ff8900]" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                        {plan.limitations.map((limitation, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Formulaire d'inscription */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-semibold">Informations de l'Entreprise</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom de l'entreprise *</label>
                      <Input
                        placeholder="AutoLink Dakar"
                        value={formData.businessName}
                        onChange={(e) => handleInputChange("businessName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Personne de contact *</label>
                      <Input
                        placeholder="Jean Dupont"
                        value={formData.contactPerson}
                        onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        placeholder="contact@entreprise.sn"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Téléphone *</label>
                      <Input
                        type="tel"
                        placeholder="+221 33 123 45 67"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Adresse *</label>
                      <Input
                        placeholder="123 Rue de la République"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Ville *</label>
                      <select
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Sélectionnez votre ville</option>
                        <option value="dakar">Dakar</option>
                        <option value="thies">Thiès</option>
                        <option value="kaolack">Kaolack</option>
                        <option value="saint-louis">Saint-Louis</option>
                        <option value="ziguinchor">Ziguinchor</option>
                        <option value="diourbel">Diourbel</option>
                        <option value="tambacounda">Tambacounda</option>
                        <option value="kolda">Kolda</option>
                        <option value="matam">Matam</option>
                        <option value="fatick">Fatick</option>
                        <option value="kedougou">Kédougou</option>
                        <option value="sedhiou">Sédhiou</option>
                        <option value="kaffrine">Kaffrine</option>
                        <option value="louga">Louga</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Type d'activité *</label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => handleInputChange("businessType", e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        required
                      >
                        <option value="">Sélectionnez le type</option>
                        <option value="concessionnaire">Concessionnaire</option>
                        <option value="garage">Garage</option>
                        <option value="particulier">Particulier</option>
                        <option value="importateur">Importateur</option>
                        <option value="loueur">Loueur</option>
                        <option value="autre">Autre</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Années d'expérience</label>
                      <Input
                        type="number"
                        placeholder="5"
                        value={formData.yearsExperience}
                        onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Site web</label>
                      <Input
                        placeholder="https://www.entreprise.sn"
                        value={formData.website}
                        onChange={(e) => handleInputChange("website", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description de l'entreprise</label>
                    <textarea
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 rounded-md resize-none"
                      placeholder="Décrivez votre entreprise, vos spécialités, vos services..."
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                    />
                  </div>

                  {/* Résumé de la commande */}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Résumé de votre abonnement</h4>
                    <div className="flex justify-between items-center">
                      <span>{plans.find(p => p.id === selectedPlan)?.name}</span>
                      <span className="font-semibold text-primary" style={{color: '#4A7C59'}}>
                        {formatPrice(plans.find(p => p.id === selectedPlan)?.price || 0)}/mois
                      </span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <CreditCard className="h-4 w-4 mr-2" />
                    Souscrire à l'abonnement {plans.find(p => p.id === selectedPlan)?.name}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
