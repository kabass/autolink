# Données de Test - AutoLink API

## Description

Les données de test sont automatiquement chargées au démarrage de l'API si la base de données est vide. Cela permet de tester l'application sans avoir à créer manuellement des données.

## Utilisateurs de test

### Comptes disponibles

Tous les mots de passe sont : **`password`**

| Email | Mot de passe | Rôle | Ville | Vérifié |
|-------|--------------|------|-------|---------|
| jean.dupont@email.com | password | BUYER | Dakar | ✅ |
| marie.diop@email.com | password | SELLER | Dakar | ✅ |
| amadou.sarr@email.com | password | SUPERVISOR | Dakar | ✅ |
| fatou.ndiaye@email.com | password | SELLER | Thiès | ✅ |
| ibrahima.ba@email.com | password | BUYER | Kaolack | ❌ |

### Utilisation

1. Connectez-vous avec n'importe quel compte ci-dessus
2. Le mot de passe est `password` pour tous
3. Testez les différentes fonctionnalités selon le rôle

## Véhicules de test

### Véhicules à vendre (5)

1. **Toyota Corolla 2022**
   - Prix : 8 500 000 CFA
   - Kilométrage : 15 000 km
   - Carburant : Essence
   - Transmission : Automatique
   - Ville : Dakar
   - Vendeur : Marie Diop

2. **Peugeot 3008 2023**
   - Prix : 12 000 000 CFA
   - Kilométrage : 5 000 km
   - Carburant : Essence
   - Transmission : Automatique
   - Ville : Dakar
   - Vendeur : Marie Diop

3. **Hyundai Tucson 2023**
   - Prix : 9 500 000 CFA
   - Kilométrage : 12 000 km
   - Carburant : Essence
   - Transmission : Automatique
   - Ville : Dakar
   - Vendeur : Fatou Ndiaye

4. **Kia Sportage 2023**
   - Prix : 7 800 000 CFA
   - Kilométrage : 6 000 km
   - Carburant : Essence
   - Transmission : Automatique
   - Ville : Thiès
   - Vendeur : Fatou Ndiaye

5. **Mercedes-Benz Classe C 2022**
   - Prix : 18 000 000 CFA
   - Kilométrage : 18 000 km
   - Carburant : Diesel
   - Transmission : Automatique
   - Ville : Dakar
   - Vendeur : Marie Diop

### Véhicules à louer (5)

1. **Toyota Hilux 2023**
   - Prix/jour : 35 000 CFA
   - Prix/semaine : 200 000 CFA
   - Prix/mois : 700 000 CFA
   - Kilométrage : 8 000 km
   - Carburant : Diesel
   - Transmission : Manuelle
   - Ville : Thiès
   - Loueur : Marie Diop

2. **Renault Duster 2021**
   - Prix/jour : 25 000 CFA
   - Prix/semaine : 150 000 CFA
   - Prix/mois : 550 000 CFA
   - Kilométrage : 25 000 km
   - Carburant : Diesel
   - Transmission : Manuelle
   - Ville : Kaolack
   - Loueur : Fatou Ndiaye

3. **Nissan Navara 2021**
   - Prix/jour : 30 000 CFA
   - Prix/semaine : 180 000 CFA
   - Prix/mois : 650 000 CFA
   - Kilométrage : 30 000 km
   - Carburant : Diesel
   - Transmission : Manuelle
   - Ville : Ziguinchor
   - Loueur : Marie Diop

4. **Mercedes-Benz Classe C 2022**
   - Prix/jour : 45 000 CFA
   - Prix/semaine : 280 000 CFA
   - Prix/mois : 950 000 CFA
   - Kilométrage : 18 000 km
   - Carburant : Diesel
   - Transmission : Automatique
   - Ville : Dakar
   - Loueur : Marie Diop

5. **BMW X5 2023**
   - Prix/jour : 50 000 CFA
   - Prix/semaine : 300 000 CFA
   - Prix/mois : 1 000 000 CFA
   - Kilométrage : 5 000 km
   - Carburant : Essence
   - Transmission : Automatique
   - 7 places
   - Ville : Dakar
   - Loueur : Marie Diop

## Favoris de test

- **Jean Dupont** a ajouté en favoris :
  - Toyota Corolla 2022
  - Peugeot 3008 2023

## Comment réinitialiser les données

### Option 1 : Supprimer et recréer la base

```bash
# Arrêter l'API
# Supprimer le volume Docker
docker-compose down -v

# Redémarrer
./start.sh
```

### Option 2 : Via SQL

```sql
-- Se connecter à PostgreSQL
docker exec -it autolink-postgres psql -U postgres -d autolink

-- Supprimer toutes les données
TRUNCATE TABLE favorites CASCADE;
TRUNCATE TABLE vehicle_features CASCADE;
TRUNCATE TABLE vehicle_images CASCADE;
TRUNCATE TABLE vehicles CASCADE;
TRUNCATE TABLE users CASCADE;

-- Redémarrer l'API pour recharger les données
```

### Option 3 : Modifier le code

Dans `DataInitializer.java`, supprimez la condition :
```java
if (userRepository.count() > 0) {
    return;
}
```

⚠️ **Attention** : Cela va dupliquer les données à chaque démarrage.

## Statistiques

- **5 utilisateurs** (2 buyers, 2 sellers, 1 supervisor)
- **10 véhicules** (5 à vendre, 5 à louer)
- **2 favoris**
- **Villes couvertes** : Dakar, Thiès, Kaolack, Ziguinchor

## Notes

- Les données sont chargées uniquement si la base est vide
- Le composant `DataInitializer` s'exécute au démarrage de l'API
- Les données sont chargées uniquement en environnement de développement (pas en production)
- Les images utilisent des URLs Unsplash pour les tests

