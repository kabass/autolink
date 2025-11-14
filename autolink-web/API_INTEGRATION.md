# Intégration API dans le Frontend

Le frontend est maintenant connecté à l'API Spring Boot.

## Configuration

1. Créer un fichier `.env.local` à la racine de `autolink-web/` :
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

2. Pour la production, mettre à jour l'URL de l'API :
```bash
NEXT_PUBLIC_API_URL=https://votre-api.com/api
```

## Fonctionnalités intégrées

### ✅ Authentification
- Login via `/api/auth/login`
- Register via `/api/auth/register`
- Récupération de l'utilisateur connecté

### ✅ Liste des véhicules
- Recherche avec filtres multiples
- Pagination
- Support vente/location

### ✅ Détails de véhicule
- Chargement depuis l'API
- Gestion des favoris
- Incrémentation des vues

### ✅ Favoris
- Ajout/Suppression de favoris
- Vérification du statut favori

## Structure

- `src/lib/api.ts` : Client API avec tous les endpoints
- `src/contexts/AuthContext.tsx` : Contexte d'authentification utilisant l'API
- `src/app/cars/page.tsx` : Page de liste utilisant l'API
- `src/app/cars/[id]/page.tsx` : Page de détails utilisant l'API

## Utilisation

L'API est automatiquement utilisée dans :
- Le contexte d'authentification
- La page de recherche de véhicules
- La page de détails de véhicule
- La gestion des favoris

## Notes

- Les erreurs API sont loggées dans la console
- Le fallback sur les données locales est géré automatiquement
- Les appels API sont asynchrones avec gestion du loading

