import Link from "next/link"
import { Car, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Plus, Shield, User } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-2">
              <Car className="h-8 w-8 text-primary" />
              <span className="font-bold text-2xl">AutoLink Sénégal</span>
            </div>
            <p className="text-gray-300 max-w-md">
              Le site de référence pour l'achat et la vente de voitures d'occasion au Sénégal. 
              Plus de 50 000 annonces vérifiées par nos experts à Dakar et dans tout le pays.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Acheter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Acheter</h3>
            <div className="space-y-2">
              <Link href="/cars" className="block text-gray-300 hover:text-white transition-colors">
                Voitures d'occasion
              </Link>
              <Link href="/cars?type=recent" className="block text-gray-300 hover:text-white transition-colors">
                Voitures récentes
              </Link>
              <Link href="/cars?type=premium" className="block text-gray-300 hover:text-white transition-colors">
                Voitures premium
              </Link>
              <Link href="/cars?type=electric" className="block text-gray-300 hover:text-white transition-colors">
                Voitures électriques
              </Link>
              <Link href="/cars?type=hybrid" className="block text-gray-300 hover:text-white transition-colors">
                Voitures hybrides
              </Link>
            </div>
          </div>

          {/* Vendre */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Vendre</h3>
            <div className="space-y-2">
              <Link href="/post" className="block text-gray-300 hover:text-white transition-colors">
                Vendre ma voiture
              </Link>
              <Link href="/sell/estimation" className="block text-gray-300 hover:text-white transition-colors">
                Estimation gratuite
              </Link>
              <Link href="/sell/pro" className="block text-gray-300 hover:text-white transition-colors">
                Espace professionnel
              </Link>
              <Link href="/sell/garage" className="block text-gray-300 hover:text-white transition-colors">
                Vendre mon garage
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Services</h3>
            <div className="space-y-2">
              <Link href="/inspection" className="block text-gray-300 hover:text-white transition-colors">
                Contrôle technique
              </Link>
              <Link href="/delivery" className="block text-gray-300 hover:text-white transition-colors">
                Livraison
              </Link>
              <Link href="/rentals" className="block text-gray-300 hover:text-white transition-colors">
                Location
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-2">Actions Rapides</h3>
            <p className="text-gray-400 text-sm">Accédez rapidement aux fonctionnalités principales</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <Link href="/post" className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Plus className="h-4 w-4 text-primary" />
              <span className="text-sm">Déposer annonce</span>
            </Link>
            <Link href="/become-seller" className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm">Devenir vendeur</span>
            </Link>
            <Link href="/auth" className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <User className="h-4 w-4 text-primary" />
              <span className="text-sm">Mon compte</span>
            </Link>
            <Link href="/cars" className="flex items-center justify-center gap-2 p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Car className="h-4 w-4 text-primary" />
              <span className="text-sm">Parcourir</span>
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Service client</div>
                <div className="text-gray-300">+221 33 123 45 67</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Email</div>
                <div className="text-gray-300">contact@autolink.sn</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-primary" />
              <div>
                <div className="font-medium">Adresse</div>
                <div className="text-gray-300">123 Avenue Léopold Sédar Senghor, Dakar</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2024 AutoLink. Tous droits réservés.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Politique de confidentialité
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Conditions générales
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
              <Link href="/legal" className="text-gray-400 hover:text-white transition-colors">
                Mentions légales
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

