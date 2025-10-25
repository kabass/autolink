"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { Calendar, Clock, MapPin, User, Phone, Car, Plus, Edit, Trash2 } from "lucide-react"

// Données d'exemple de rendez-vous
const appointments = [
  {
    id: "1",
    type: "visite",
    carTitle: "Toyota Corolla 2022",
    carPrice: "8 500 000 FCFA",
    carImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=200&h=150&fit=crop",
    clientName: "Moussa Diallo",
    clientPhone: "+221 77 123 45 67",
    clientAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-20",
    time: "14:30",
    location: "Dakar, Plateau",
    address: "123 Avenue Léopold Sédar Senghor",
    status: "confirmed",
    notes: "Client intéressé par l'achat, souhaite voir le véhicule"
  },
  {
    id: "2",
    type: "test_drive",
    carTitle: "BMW X5 2023",
    carPrice: "45 000 FCFA/jour",
    carImage: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200&h=150&fit=crop",
    clientName: "Fatou Sarr",
    clientPhone: "+221 77 987 65 43",
    clientAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-22",
    time: "10:00",
    location: "Dakar, Almadies",
    address: "456 Corniche Ouest",
    status: "pending",
    notes: "Essai de conduite pour location longue durée"
  },
  {
    id: "3",
    type: "visite",
    carTitle: "Peugeot 3008 2021",
    carPrice: "6 200 000 FCFA",
    carImage: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=200&h=150&fit=crop",
    clientName: "Ibrahima Ndiaye",
    clientPhone: "+221 77 555 44 33",
    clientAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    date: "2024-01-18",
    time: "16:00",
    location: "Thiès",
    address: "789 Avenue Blaise Diagne",
    status: "completed",
    notes: "Visite effectuée, négociation en cours"
  }
]

export default function AppointmentsPage() {
  const [appointmentsList, setAppointmentsList] = useState(appointments)
  const [filterStatus, setFilterStatus] = useState("all")
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à vos rendez-vous.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const filteredAppointments = filterStatus === "all" 
    ? appointmentsList 
    : appointmentsList.filter(appointment => appointment.status === filterStatus)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-600 text-white">Confirmé</Badge>
      case "pending":
        return <Badge className="bg-yellow-600 text-white">En attente</Badge>
      case "completed":
        return <Badge className="bg-blue-600 text-white">Terminé</Badge>
      case "cancelled":
        return <Badge className="bg-red-600 text-white">Annulé</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "visite":
        return <Car className="h-4 w-4" />
      case "test_drive":
        return <Car className="h-4 w-4" />
      default:
        return <Calendar className="h-4 w-4" />
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "visite":
        return "Visite"
      case "test_drive":
        return "Essai de conduite"
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Mes Rendez-vous</h1>
              <p className="text-gray-600">Gérez vos rendez-vous avec les clients</p>
            </div>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nouveau rendez-vous
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{appointmentsList.length}</div>
              <div className="text-sm text-gray-600">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {appointmentsList.filter(a => a.status === "confirmed").length}
              </div>
              <div className="text-sm text-gray-600">Confirmés</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {appointmentsList.filter(a => a.status === "pending").length}
              </div>
              <div className="text-sm text-gray-600">En attente</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {appointmentsList.filter(a => a.status === "completed").length}
              </div>
              <div className="text-sm text-gray-600">Terminés</div>
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
            <option value="all">Tous les rendez-vous</option>
            <option value="confirmed">Confirmés</option>
            <option value="pending">En attente</option>
            <option value="completed">Terminés</option>
            <option value="cancelled">Annulés</option>
          </select>
        </div>

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Aucun rendez-vous</h3>
              <p className="text-gray-600 mb-6">
                {filterStatus === "all" 
                  ? "Vous n'avez pas encore de rendez-vous."
                  : `Aucun rendez-vous avec le statut "${filterStatus}".`
                }
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Planifier un rendez-vous
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Car Image */}
                    <div className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={appointment.carImage} 
                        alt={appointment.carTitle}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Appointment Details */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">{appointment.carTitle}</h3>
                          <p className="text-primary font-medium">{appointment.carPrice}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(appointment.status)}
                        </div>
                      </div>

                      {/* Client Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <img 
                          src={appointment.clientAvatar} 
                          alt={appointment.clientName}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-sm">{appointment.clientName}</p>
                          <p className="text-xs text-gray-600">{appointment.clientPhone}</p>
                        </div>
                      </div>

                      {/* Appointment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-gray-500" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-gray-500" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      {/* Type and Notes */}
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="outline" className="text-xs">
                          {getTypeIcon(appointment.type)}
                          <span className="ml-1">{getTypeLabel(appointment.type)}</span>
                        </Badge>
                      </div>

                      {appointment.notes && (
                        <p className="text-sm text-gray-600 mb-3 bg-gray-50 p-2 rounded">
                          {appointment.notes}
                        </p>
                      )}

                      {/* Actions */}
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-2" />
                          Modifier
                        </Button>
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-2" />
                          Appeler
                        </Button>
                        {appointment.status === "pending" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Confirmer
                          </Button>
                        )}
                        {appointment.status === "confirmed" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Marquer terminé
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
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
