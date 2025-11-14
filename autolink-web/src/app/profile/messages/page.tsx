"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/AuthContext"
import { MessageSquare, Search, Filter, Star, Reply, Trash2, User } from "lucide-react"

// Données d'exemple de messages
const messages = [
  {
    id: "1",
    sender: "Moussa Diallo",
    senderAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    subject: "Intéressé par votre Toyota Corolla",
    preview: "Bonjour, je suis intéressé par votre Toyota Corolla 2022. Pourriez-vous me donner plus d'informations...",
    timestamp: "2024-01-15T10:30:00Z",
    isRead: false,
    carTitle: "Toyota Corolla 2022",
    carPrice: "8 500 000 FCFA"
  },
  {
    id: "2",
    sender: "Fatou Sarr",
    senderAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
    subject: "Question sur la BMW X5",
    preview: "Bonjour, avez-vous encore la BMW X5 disponible ? Je souhaiterais la voir...",
    timestamp: "2024-01-14T15:45:00Z",
    isRead: true,
    carTitle: "BMW X5 2023",
    carPrice: "45 000 FCFA/jour"
  },
  {
    id: "3",
    sender: "Ibrahima Ndiaye",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
    subject: "Négociation prix",
    preview: "Bonjour, je suis très intéressé par votre véhicule. Serait-il possible de négocier le prix...",
    timestamp: "2024-01-13T09:20:00Z",
    isRead: true,
    carTitle: "Toyota Corolla 2022",
    carPrice: "8 500 000 FCFA"
  }
]

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null)
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen py-8 bg-gray-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Accès refusé</h2>
              <p className="text-gray-600 mb-6">
                Vous devez être connecté pour accéder à vos messages.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === "all" || 
                         (filterStatus === "unread" && !message.isRead) ||
                         (filterStatus === "read" && message.isRead)
    return matchesSearch && matchesFilter
  })

  const unreadCount = messages.filter(m => !m.isRead).length

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Ma Messagerie</h1>
              <p className="text-gray-600">Gérez vos conversations avec les acheteurs</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-sm">
                {unreadCount} non lus
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Messages ({filteredMessages.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {/* Search and Filter */}
                <div className="p-4 border-b">
                  <div className="space-y-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Rechercher dans les messages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <select 
                      value={filterStatus} 
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                    >
                      <option value="all">Tous les messages</option>
                      <option value="unread">Non lus</option>
                      <option value="read">Lus</option>
                    </select>
                  </div>
                </div>

                {/* Messages */}
                <div className="max-h-96 overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>Aucun message trouvé</p>
                    </div>
                  ) : (
                    filteredMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                          selectedMessage === message.id ? "bg-[#f5f5f5]" : ""
                        } ${!message.isRead ? "bg-[#f9f9f9]" : ""}`}
                        onClick={() => setSelectedMessage(message.id)}
                      >
                        <div className="flex items-start gap-3">
                          <img 
                            src={message.senderAvatar} 
                            alt={message.sender}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className={`text-sm font-medium ${!message.isRead ? "font-semibold" : ""}`}>
                                {message.sender}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {new Date(message.timestamp).toLocaleDateString()}
                              </span>
                            </div>
                            <p className={`text-sm ${!message.isRead ? "font-medium" : ""}`}>
                              {message.subject}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {message.preview}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {message.carTitle}
                              </Badge>
                              <span className="text-xs text-primary font-medium">
                                {message.carPrice}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2">
            {selectedMessage ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Conversation
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-2" />
                        Répondre
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {(() => {
                    const message = messages.find(m => m.id === selectedMessage)
                    if (!message) return null
                    
                    return (
                      <div className="space-y-4">
                        {/* Message Header */}
                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                          <img 
                            src={message.senderAvatar} 
                            alt={message.sender}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-semibold">{message.sender}</h3>
                            <p className="text-sm text-gray-600">{message.subject}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(message.timestamp).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline" className="text-xs">
                              {message.carTitle}
                            </Badge>
                            <p className="text-sm font-medium text-primary mt-1">
                              {message.carPrice}
                            </p>
                          </div>
                        </div>

                        {/* Message Content */}
                        <div className="p-4 border rounded-lg">
                          <p className="text-gray-800">
                            {message.preview}
                          </p>
                        </div>

                        {/* Reply Form */}
                        <div className="space-y-3">
                          <h4 className="font-medium">Répondre</h4>
                          <textarea 
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                            rows={4}
                            placeholder="Tapez votre réponse..."
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="outline">Annuler</Button>
                            <Button>Envoyer</Button>
                          </div>
                        </div>
                      </div>
                    )
                  })()}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Sélectionnez un message</h3>
                  <p className="text-gray-600">
                    Cliquez sur un message dans la liste pour voir la conversation complète.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
