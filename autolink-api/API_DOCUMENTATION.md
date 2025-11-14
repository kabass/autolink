# Documentation de l'API AutoLink

## Base URL
```
http://localhost:8080/api
```

## Endpoints

### Authentification

#### POST `/api/auth/login`
Connexion d'un utilisateur.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "id": 1,
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "user@example.com",
  "phone": "+221 33 123 45 67",
  "role": "BUYER",
  "isVerified": true,
  "canSell": false,
  "canBuy": true,
  "canRent": true,
  "canSupervise": false,
  "canManageUsers": false
}
```

#### POST `/api/auth/register`
Inscription d'un nouvel utilisateur.

**Request Body:**
```json
{
  "firstName": "Jean",
  "lastName": "Dupont",
  "email": "user@example.com",
  "password": "password123",
  "phone": "+221 33 123 45 67",
  "role": "BUYER",
  "city": "Dakar"
}
```

#### GET `/api/auth/me?email=user@example.com`
Récupérer les informations de l'utilisateur connecté.

---

### Véhicules

#### GET `/api/vehicles`
Rechercher des véhicules avec filtres.

**Query Parameters:**
- `query` (string, optional): Recherche générique
- `make` (string, optional): Marque du véhicule
- `model` (string, optional): Modèle du véhicule
- `city` (string, optional): Ville
- `maxMileage` (string, optional): Kilométrage maximum
- `type` (string, optional): "all", "sale", "rental"
- `minPrice` (string, optional): Prix minimum
- `maxPrice` (string, optional): Prix maximum
- `minYear` (string, optional): Année minimum
- `maxYear` (string, optional): Année maximum
- `fuelType` (string, optional): "ESSENCE", "DIESEL", "ELECTRIC", "HYBRID"
- `transmission` (string, optional): "MANUELLE", "AUTOMATIQUE"
- `page` (int, default: 0): Numéro de page
- `size` (int, default: 20): Taille de la page

**Response:**
```json
{
  "content": [
    {
      "id": 1,
      "make": "Toyota",
      "model": "Corolla",
      "year": 2022,
      "price": 8500000,
      "mileage": 15000,
      "fuelType": "ESSENCE",
      "transmission": "AUTOMATIQUE",
      "seats": 5,
      "isRental": false,
      "city": "Dakar",
      "views": 245,
      "favoritesCount": 18
    }
  ],
  "totalElements": 100,
  "totalPages": 5,
  "size": 20,
  "number": 0
}
```

#### GET `/api/vehicles/{id}`
Récupérer les détails d'un véhicule.

#### POST `/api/vehicles?userId=1`
Créer une nouvelle annonce de véhicule.

**Request Body:**
```json
{
  "make": "Toyota",
  "model": "Corolla",
  "year": 2022,
  "price": 8500000,
  "mileage": 15000,
  "fuelType": "ESSENCE",
  "transmission": "AUTOMATIQUE",
  "seats": 5,
  "isRental": false,
  "description": "Véhicule en excellent état...",
  "images": ["url1", "url2"],
  "features": ["Climatisation", "GPS"],
  "city": "Dakar"
}
```

#### PUT `/api/vehicles/{id}?userId=1`
Mettre à jour une annonce.

#### DELETE `/api/vehicles/{id}?userId=1`
Supprimer (désactiver) une annonce.

#### GET `/api/vehicles/user/{userId}?page=0&size=20`
Récupérer les véhicules d'un utilisateur.

#### POST `/api/vehicles/{id}/view`
Incrémenter le compteur de vues.

---

### Favoris

#### POST `/api/favorites?userId=1&vehicleId=1`
Ajouter un véhicule aux favoris.

#### DELETE `/api/favorites?userId=1&vehicleId=1`
Retirer un véhicule des favoris.

#### GET `/api/favorites/check?userId=1&vehicleId=1`
Vérifier si un véhicule est dans les favoris.

**Response:**
```json
true
```

#### GET `/api/favorites/user/{userId}?page=0&size=20`
Récupérer les favoris d'un utilisateur.

---

### Santé

#### GET `/api/health`
Vérifier l'état de l'API.

**Response:**
```json
{
  "status": "UP",
  "service": "autolink-api"
}
```

---

## Types de données

### UserRole
- `BUYER`: Acheteur/Locataire
- `SELLER`: Vendeur
- `SUPERVISOR`: Superviseur

### FuelType
- `ESSENCE`
- `DIESEL`
- `ELECTRIC`
- `HYBRID`

### TransmissionType
- `MANUELLE`
- `AUTOMATIQUE`

---

## Configuration CORS

L'API est configurée pour accepter les requêtes depuis n'importe quelle origine (`*`). Pour la production, il est recommandé de restreindre cela à votre domaine frontend.

---

## Notes

- Tous les endpoints retournent du JSON
- Les erreurs sont retournées avec un code HTTP approprié et un message d'erreur
- La pagination est utilisée pour les listes de résultats
- Les mots de passe sont hashés avec BCrypt avant stockage

