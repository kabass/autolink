"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { Crown, Shield, Users, FileText, CheckCircle, XCircle, Clock, Eye, Filter } from "lucide-react"

// Données d'exemple d'annonces à valider
const pendingAds = [
  {
    id: "1",
    title: "Toyota Corolla 2022",
    seller: "Marie Diop",
    sellerEmail: "marie.diop@email.com",
    price: 8500000,
    location: "Dakar",
    submittedAt: "2024-01-15T10:30:00Z",
    images: ["https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=150&fit=crop"],
    status: "pending"
  },
  {
    id: "2",
    title: "BMW X5 2023",
    seller: "Amadou Sarr",
    sellerEmail: "amadou.sarr@email.com",
    price: 0,
    rentalPricePerDay: 45000,
    location: "Dakar",
    submittedAt: "2024-01-14T15:45:00Z",
    images: ["https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=150&fit=crop"],
    status: "pending"
  },
  {
    id: "3",
    title: "Peugeot 3008 2021",
    seller: "Fatou Fall",
    sellerEmail: "fatou.fall@email.com",
    price: 6200000,
    location: "Thiès",
    submittedAt: "2024-01-13T09:20:00Z",
    images: ["https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=150&fit=crop"],
    status: "pending"
  }
]

export default function SupervisorDashboard() {
  const [ads, setAds] = useState(pendingAds)
  const [filterStatus, setFilterStatus] = useState("all")
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Crown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder au dashboard superviseur.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!user?.permissions?.canSupervise) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Crown className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Permissions insuffisantes</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être superviseur pour accéder à cette page.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const handleApproveAd = (adId: string) => {
    setAds(ads.map(ad => 
      ad.id === adId ? { ...ad, status: "approved" } : ad
    ))
  }

  const handleRejectAd = (adId: string) => {
    setAds(ads.map(ad => 
      ad.id === adId ? { ...ad, status: "rejected" } : ad
    ))
  }

  const filteredAds = filterStatus === "all" 
    ? ads 
    : ads.filter(ad => ad.status === filterStatus)

  const pendingCount = ads.filter(ad => ad.status === "pending").length
  const approvedCount = ads.filter(ad => ad.status === "approved").length
  const rejectedCount = ads.filter(ad => ad.status === "rejected").length

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                <Crown className="h-8 w-8 text-yellow-500" />
                Dashboard Superviseur
              </h1>
              <p className="text-gray-600">Validez et gérez les annonces du site</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-600 text-white">
                <Crown className="h-3 w-3 mr-1" />
                Superviseur
              </Badge>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{ads.length}</div>
              <div className="text-sm text-gray-600">Total annonces</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-gray-600">Approuvées</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-sm text-gray-600">Rejetées</div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Valider les annonces</h3>
              <p className="text-sm text-gray-600 mb-4">
                {pendingCount} annonces en attente de validation
              </p>
              <Button variant="outline" size="sm">
                Voir les annonces
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Gérer les utilisateurs</h3>
              <p className="text-sm text-gray-600 mb-4">
                Modérer les comptes utilisateurs
              </p>
              <Button variant="outline" size="sm">
                Gestion utilisateurs
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Rapports</h3>
              <p className="text-sm text-gray-600 mb-4">
                Statistiques et rapports du site
              </p>
              <Button variant="outline" size="sm">
                Voir les rapports
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="all">Toutes les annonces</option>
            <option value="pending">En attente</option>
            <option value="approved">Approuvées</option>
            <option value="rejected">Rejetées</option>
          </select>
        </div>

        {/* Ads List */}
        {filteredAds.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucune annonce</h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all" 
                  ? "Aucune annonce à valider."
                  : `Aucune annonce avec le statut "${filterStatus}".`
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredAds.map((ad) => (
              <Card key={ad.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Ad Image */}
                    <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={ad.images[0]} 
                        alt={ad.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Ad Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{ad.title}</h3>
                          <p className="text-primary font-medium">
                            {ad.price > 0 
                              ? `${ad.price.toLocaleString()} FCFA`
                              : `${ad.rentalPricePerDay?.toLocaleString()} FCFA/jour`
                            }
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {ad.status === "pending" && (
                            <Badge className="bg-yellow-600 text-white">
                              <Clock className="h-3 w-3 mr-1" />
                              En attente
                            </Badge>
                          )}
                          {ad.status === "approved" && (
                            <Badge className="bg-green-600 text-white">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Approuvée
                            </Badge>
                          )}
                          {ad.status === "rejected" && (
                            <Badge className="bg-red-600 text-white">
                              <XCircle className="h-3 w-3 mr-1" />
                              Rejetée
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Seller Info */}
                      <div className="mb-3">
                        <p className="text-sm text-gray-600">
                          <strong>Vendeur:</strong> {ad.seller} ({ad.sellerEmail})
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Localisation:</strong> {ad.location}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Soumis le:</strong> {new Date(ad.submittedAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          Voir l'annonce
                        </Button>
                        {ad.status === "pending" && (
                          <>
                            <Button 
                              size="sm" 
                              className="bg-green-600 hover:bg-green-700"
                              onClick={() => handleApproveAd(ad.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approuver
                            </Button>
                            <Button 
                              size="sm" 
                              className="bg-red-600 hover:bg-red-700"
                              onClick={() => handleRejectAd(ad.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Rejeter
                            </Button>
                          </>
                        )}
                        {ad.status === "approved" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleRejectAd(ad.id)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Rejeter
                          </Button>
                        )}
                        {ad.status === "rejected" && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleApproveAd(ad.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approuver
                          </Button>
                        )}
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
