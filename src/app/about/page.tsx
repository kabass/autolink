import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Car, Shield, Clock, Star, Users, Award, CheckCircle } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">À propos d'AutoLink Sénégal</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nous révolutionnons l'expérience d'achat, de vente et de location de voitures au Sénégal avec 
            la transparence, la confiance et la technologie au cœur de tout ce que nous faisons.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card className="p-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Notre Mission</h2>
              <p className="text-muted-foreground mb-4">
                Rendre les transactions automobiles simples, sûres et transparentes pour tous. 
                Nous croyons que l'achat, la vente ou la location d'une voiture ne devrait pas être compliqué 
                ou stressant.
              </p>
              <p className="text-muted-foreground">
                En connectant des acheteurs et vendeurs vérifiés, en fournissant des inspections complètes 
                des véhicules et en offrant un traitement de paiement sécurisé, nous construisons un 
                marché de confiance.
              </p>
            </CardContent>
          </Card>

          <Card className="p-8">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-4">Notre Vision</h2>
              <p className="text-muted-foreground mb-4">
                Devenir le marché automobile le plus fiable au monde, où chaque 
                transaction est fluide, chaque véhicule est vérifié, et chaque client 
                se sent en confiance.
              </p>
              <p className="text-muted-foreground">
                Nous envisageons un avenir où la propriété et la location de voitures sont accessibles, 
                abordables et respectueuses de l'environnement pour tous.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">5,000+</div>
            <div className="text-sm text-muted-foreground">Clients Satisfaits</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Voitures Vendues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9★</div>
            <div className="text-sm text-muted-foreground">Note Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Nos Valeurs</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Confiance & Sécurité</h3>
                <p className="text-muted-foreground">
                  Chaque véhicule est minutieusement inspecté et chaque transaction est protégée 
                  par nos mesures de sécurité complètes.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Efficacité</h3>
                <p className="text-muted-foreground">
                  Nous rationalisons tout le processus pour vous faire gagner du temps et rendre les 
                  transactions automobiles aussi rapides et faciles que possible.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Excellence</h3>
                <p className="text-muted-foreground">
                  Nous nous engageons à fournir un service exceptionnel et à maintenir 
                  les plus hauts standards dans tout ce que nous faisons.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Rencontrez Notre Équipe</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground mb-2">PDG & Fondatrice</p>
                <p className="text-sm text-muted-foreground">
                  Vétéran de l'industrie automobile avec plus de 15 ans d'expérience dans 
                  la vente de véhicules et le service client.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Michael Chen</h3>
                <p className="text-sm text-muted-foreground mb-2">Directeur Technique</p>
                <p className="text-sm text-muted-foreground">
                  Leader technologique axé sur la construction de plateformes sécurisées et évolutives 
                  qui améliorent l'expérience d'achat de voitures.
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-1">Emily Rodriguez</h3>
                <p className="text-sm text-muted-foreground mb-2">Responsable des Opérations</p>
                <p className="text-sm text-muted-foreground">
                  Experte en opérations garantissant des transactions fluides et un support client 
                  exceptionnel à tous les points de contact.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Prêt à Commencer ?</h2>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez des milliers de clients satisfaits qui font confiance à AutoLink pour leurs besoins automobiles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Parcourir les Voitures
              </Button>
              <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Nous Contacter
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

