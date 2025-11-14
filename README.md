# AutoLink

Application de location et vente de véhicules.

## Structure du projet

Le projet est organisé en deux sous-projets :

### `autolink-web/`
Application frontend Next.js avec React et TypeScript.

**Technologies :**
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Leaflet (cartes)

**Pour démarrer :**
```bash
cd autolink-web
npm install
npm run dev
```

### `autolink-api/`
API backend Spring Boot avec PostgreSQL.

**Technologies :**
- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL
- Lombok
- Maven

**Prérequis :**
- Java 17+
- Maven 3.6+
- PostgreSQL 12+

**Configuration :**
1. Créer la base de données PostgreSQL :
```sql
CREATE DATABASE autolink;
```

2. Configurer les paramètres dans `autolink-api/src/main/resources/application.properties`

**Pour démarrer :**
```bash
cd autolink-api
mvn spring-boot:run
```

## Développement

Les deux projets peuvent être développés et exécutés indépendamment :
- Le frontend écoute sur `http://localhost:3000` (par défaut)
- L'API écoute sur `http://localhost:8080` (par défaut)

