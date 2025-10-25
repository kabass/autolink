import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Car, 
  CreditCard, 
  Shield, 
  Phone, 
  Mail, 
  MessageSquare,
  HelpCircle,
  BookOpen,
  Users,
  Settings
} from "lucide-react"

export default function HelpPage() {
  const helpCategories = [
    {
      title: "Acheter une Voiture",
      icon: Car,
      description: "Tout ce que vous devez savoir sur l'achat d'un véhicule",
      topics: [
        "Comment rechercher des voitures",
        "Comprendre les rapports d'historique des véhicules",
        "Options de paiement",
        "Processus d'essai",
        "Finaliser votre achat"
      ]
    },
    {
      title: "Vendre Votre Voiture",
      icon: CreditCard,
      description: "Vendez votre véhicule rapidement et en toute sécurité",
      topics: [
        "Créer une annonce de véhicule",
        "Fixer le bon prix",
        "Préparer l'inspection",
        "Rencontrer les acheteurs",
        "Finaliser la vente"
      ]
    },
    {
      title: "Louer une Voiture",
      icon: Shield,
      description: "Louez une voiture pour votre prochain voyage",
      topics: [
        "Véhicules de location disponibles",
        "Conditions de location",
        "Processus de retrait et retour",
        "Politique d'annulation"
      ]
    },
    {
      title: "Compte & Profil",
      icon: Users,
      description: "Gérez les paramètres de votre compte",
      topics: [
        "Créer un compte",
        "Mettre à jour les informations du profil",
        "Gérer les recherches sauvegardées",
        "Voir l'historique des achats",
        "Sécurité du compte"
      ]
    }
  ]

  const faqs = [
    {
      question: "Comment rechercher des voitures sur AutoLink ?",
      answer: "Utilisez nos filtres de recherche avancés pour trouver des voitures par marque, modèle, année, gamme de prix, type de carburant, et plus encore. Vous pouvez également parcourir par catégorie (à vendre ou à louer) pour affiner vos options."
    },
    {
      question: "Tous les véhicules sont-ils inspectés avant d'être listés ?",
      answer: "Oui, chaque véhicule sur notre plateforme subit une inspection complète par des mécaniciens certifiés. Cela inclut les systèmes mécaniques, les équipements de sécurité et l'évaluation de l'état esthétique."
    },
    {
      question: "Comment planifier un essai ?",
      answer: "Contactez le vendeur directement via notre plateforme ou appelez notre équipe de service client. Nous organiserons un moment et un lieu convenables pour votre essai."
    },
    {
      question: "Que contient le rapport d'historique du véhicule ?",
      answer: "Nos rapports d'historique des véhicules incluent l'historique des accidents, les dossiers de service, les informations de titre, les propriétaires précédents, et tout rappel ou problème de sécurité."
    },
    {
      question: "Puis-je annuler une réservation de location ?",
      answer: "Oui, vous pouvez annuler votre réservation jusqu'à 24 heures avant le retrait pour un remboursement complet. Les annulations dans les 24 heures peuvent entraîner des frais."
    }
  ]

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Centre d'Aide</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Trouvez des réponses aux questions courantes et apprenez à tirer le meilleur parti des fonctionnalités d'AutoLink.
          </p>
        </div>

        {/* Search Help */}
        <div className="mb-12">
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Vous ne trouvez pas ce que vous cherchez ?</h2>
              <p className="text-muted-foreground mb-6">
                Recherchez dans nos articles d'aide ou contactez notre équipe de support pour une assistance personnalisée.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button size="lg" className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Contacter le Support
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Nous Appeler
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Help Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Parcourir par Catégorie</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helpCategories.map((category, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <category.icon className="h-6 w-6 text-primary" />
                    {category.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-center gap-2 text-sm">
                        <HelpCircle className="h-4 w-4 text-primary" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Questions Fréquemment Posées</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Options */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Besoin d'Aide Supplémentaire ?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Phone className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nous Appeler</h3>
                <p className="text-muted-foreground mb-4">
                  Parlez avec notre équipe de service client
                </p>
                <Badge variant="secondary">+221 33 123 45 67</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Lun-Ven: 8h-18h<br />
                  Sam: 8h-16h
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Nous Écrire</h3>
                <p className="text-muted-foreground mb-4">
                  Envoyez-nous un message détaillé
                </p>
                <Badge variant="secondary">support@autolink.sn</Badge>
                <p className="text-sm text-muted-foreground mt-2">
                  Nous répondrons dans les 24 heures
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <MessageSquare className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">Chat en Direct</h3>
                <p className="text-muted-foreground mb-4">
                  Chattez avec nous en temps réel
                </p>
                <Button variant="outline">
                  Commencer le Chat
                </Button>
                <p className="text-sm text-muted-foreground mt-2">
                  Disponible 8h-18h
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Resources */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Ressources Supplémentaires</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Guide Utilisateur
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Guide complet couvrant toutes les fonctionnalités d'AutoLink et les meilleures pratiques.
                </p>
                <Button variant="outline">Télécharger PDF</Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Dépannage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Problèmes courants et solutions pour vous aider à résoudre rapidement les problèmes.
                </p>
                <Button variant="outline">Voir le Guide</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

