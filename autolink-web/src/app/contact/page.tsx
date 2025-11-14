"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  Send,
  Car,
  Shield,
  Star
} from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", formData)
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Nous Contacter - AutoLink Sénégal</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Vous avez des questions sur nos services au Sénégal ? Nous sommes là pour vous aider ! 
            Contactez notre équipe à Dakar pour une assistance personnalisée.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Entrer en Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Téléphone</div>
                    <div className="text-sm text-muted-foreground">+33 1 23 45 67 89</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-muted-foreground">contact@autolink.fr</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Adresse</div>
                    <div className="text-sm text-muted-foreground">
                      123 Avenue des Champs-Élysées<br />
                      75008 Paris, France
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-semibold">Horaires</div>
                    <div className="text-sm text-muted-foreground">
                      Lun-Ven: 8h-18h<br />
                      Sam: 8h-16h<br />
                      Dim: Fermé
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Pourquoi Nous Choisir ?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <Star className="h-4 w-4 text-yellow-500 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">Note Client 4.9/5</div>
                    <div className="text-xs text-muted-foreground">Basé sur 1 200+ avis</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Car className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">500+ Véhicules</div>
                    <div className="text-xs text-muted-foreground">Disponibles à la vente et location</div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="h-4 w-4 text-primary mt-0.5" />
                  <div>
                    <div className="text-sm font-medium">100% Vérifiés</div>
                    <div className="text-xs text-muted-foreground">Tous les véhicules inspectés</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Envoyez-nous un Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nom Complet *</label>
                      <Input
                        placeholder="Jean Dupont"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email *</label>
                      <Input
                        type="email"
                        placeholder="jean@exemple.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Numéro de Téléphone</label>
                      <Input
                        type="tel"
                        placeholder="+33 1 23 45 67 89"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Sujet *</label>
                      <Input
                        placeholder="Comment pouvons-nous vous aider ?"
                        value={formData.subject}
                        onChange={(e) => handleInputChange("subject", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message *</label>
                    <textarea
                      className="w-full min-h-[120px] px-3 py-2 border border-input rounded-md resize-none"
                      placeholder="Dites-nous en plus sur votre demande..."
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Send className="h-4 w-4 mr-2" />
                    Envoyer le Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Questions Fréquemment Posées</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Comment planifier un essai ?</h3>
                <p className="text-sm text-muted-foreground">
                  Vous pouvez planifier un essai en nous appelant au +33 1 23 45 67 89 ou 
                  en remplissant le formulaire de contact ci-dessus. Nous organiserons un moment convenable pour vous.
                </p>
              </CardContent>
            </Card>
            
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Qu'est-ce qui est inclus dans l'inspection du véhicule ?</h3>
                <p className="text-sm text-muted-foreground">
                  Notre inspection complète couvre les systèmes mécaniques, les équipements de sécurité, 
                  et l'état esthétique. Tous les véhicules sont livrés avec un rapport d'inspection détaillé.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Puis-je vendre ma voiture via AutoLink ?</h3>
                <p className="text-sm text-muted-foreground">
                  Absolument ! Nous offrons des annonces gratuites et vous mettons en relation avec des acheteurs vérifiés. 
                  Visitez notre page "Vendre ma voiture" pour commencer.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

