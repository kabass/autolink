# AutoLink API

API backend pour l'application AutoLink, construite avec Spring Boot et PostgreSQL.

## Prérequis

- Java 17 ou supérieur
- Maven 3.6+
- Docker et Docker Compose (pour le démarrage automatique de PostgreSQL)

## Configuration Keycloak & Login social

Les boutons "Continuer avec Google/Facebook" ne peuvent fonctionner que si Keycloak connaît les identifiants OAuth de vos applications.

1. Copiez le fichier d'exemple puis éditez-le :
   ```bash
   cd autolink-api
   cp keycloak.env.example keycloak.env
   ```
2. Renseignez les valeurs suivantes dans `keycloak.env` :
   - `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
   - `FACEBOOK_CLIENT_ID` / `FACEBOOK_CLIENT_SECRET`
   - `SOCIAL_REDIRECT_URI` (ex: `http://localhost:3000/auth/social/callback`)
   - `KEYCLOAK_WEB_ORIGIN` (ex: `http://localhost:3000`)
   - `KEYCLOAK_IDP_DISABLE_TRUST_MANAGER` : passez à `true` si votre réseau ajoute un proxy HTTPS avec un certificat non reconnu (cela désactive la vérification TLS **uniquement pour le dev**)
3. Redémarrez `docker compose up keycloak` (ou `start.sh`). Le script `start-with-idp.sh` ré-importera alors les fournisseurs d'identité et Keycloak vous redirigera directement vers Google/Facebook au clic.

⚠️ Si l'un de ces identifiants manque, Keycloak affiche son écran de connexion natif (comportement que vous observez actuellement).

## Démarrage rapide avec Docker

### Option 1 : Script automatique (Recommandé)

**Linux/Mac:**
```bash
./start.sh
```

**Windows:**
```cmd
start.bat
```

Le script va :
1. Démarrer PostgreSQL dans un conteneur Docker
2. Attendre que PostgreSQL soit prêt
3. Lancer l'API Spring Boot

### Option 1b : Mode Debug (IDE)

**Linux/Mac:**
```bash
./start-debug.sh
```

**Windows:**
```cmd
start-debug.bat
```

Le script démarre l'API en mode debug sur le port **5005**. Connectez votre IDE à ce port pour déboguer.

**Configuration IDE :**
- **IntelliJ IDEA** : Run → Edit Configurations → Ajouter "Remote JVM Debug" → Port 5005
- **VS Code** : Utilisez la configuration dans `.vscode/launch.json`
- **Eclipse** : Run → Debug Configurations → Remote Java Application → Port 5005

### Option 2 : Docker Compose manuel

1. Démarrer PostgreSQL :
```bash
docker-compose up -d postgres
```

2. Attendre que PostgreSQL soit prêt (environ 10 secondes)

3. Lancer l'API :
```bash
mvn spring-boot:run -Dspring-boot.run.profiles=docker
```

### Option 3 : PostgreSQL local

Si vous avez PostgreSQL installé localement :

1. Créer la base de données :
```sql
CREATE DATABASE autolink;
```

2. Configurer les paramètres dans `application.properties` si nécessaire

3. Lancer l'API :
```bash
mvn spring-boot:run
```

## Configuration

### Variables d'environnement

Vous pouvez utiliser des variables d'environnement pour configurer la base de données :

```bash
export DATABASE_URL=jdbc:postgresql://localhost:5432/autolink
export DATABASE_USERNAME=postgres
export DATABASE_PASSWORD=postgres
```

### Profils Spring Boot

- **default** : Configuration par défaut (PostgreSQL local)
- **dev** : Configuration de développement
- **docker** : Configuration pour Docker Compose
- **prod** : Configuration de production

## Arrêt

Pour arrêter PostgreSQL :
```bash
docker-compose down
```

Pour arrêter l'API, utilisez `Ctrl+C` dans le terminal où elle tourne.

## Structure du projet

```
autolink-api/
├── src/
│   ├── main/
│   │   ├── java/com/autolink/api/
│   │   │   ├── controller/     # Contrôleurs REST
│   │   │   ├── service/         # Services métier
│   │   │   ├── repository/     # Repositories JPA
│   │   │   ├── entity/         # Entités JPA
│   │   │   ├── dto/            # DTOs
│   │   │   └── config/         # Configuration
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── application-dev.properties
│   │       ├── application-docker.properties
│   │       └── application-prod.properties
│   └── test/
├── docker-compose.yml          # Configuration Docker Compose
├── start.sh                    # Script de démarrage (Linux/Mac)
├── start.bat                   # Script de démarrage (Windows)
└── pom.xml
```

## Technologies utilisées

- Spring Boot 3.2.0
- Spring Data JPA
- PostgreSQL 15
- Lombok
- Maven
- Docker & Docker Compose

## Données de test

L'API charge automatiquement des données de test au démarrage si la base de données est vide. Cela inclut :
- 5 utilisateurs (buyers, sellers, supervisor)
- 10 véhicules (5 à vendre, 5 à louer)
- Des favoris de test

**Comptes de test :**
- Email : `jean.dupont@email.com` / Mot de passe : `password` (BUYER)
- Email : `marie.diop@email.com` / Mot de passe : `password` (SELLER)
- Email : `amadou.sarr@email.com` / Mot de passe : `password` (SUPERVISOR)

Voir [TEST_DATA.md](./TEST_DATA.md) pour plus de détails.

## Documentation API

Voir [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) pour la documentation complète de l'API.

## Débogage dans l'IDE

### IntelliJ IDEA

1. **Configuration automatique** : Le fichier `.idea/runConfigurations/Debug_Spring_Boot.xml` est déjà créé
   - Run → Edit Configurations
   - Vous devriez voir "Debug Spring Boot"
   - Cliquez sur Debug

2. **Configuration manuelle** :
   - Run → Edit Configurations
   - Cliquez sur "+" → Spring Boot
   - Main class: `com.autolink.api.AutolinkApiApplication`
   - Active profiles: `docker`
   - VM options: `-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005`
   - Cochez "Debug"

3. **Remote Debug** (si l'API tourne déjà) :
   - Run → Edit Configurations
   - Cliquez sur "+" → Remote JVM Debug
   - Port: `5005`
   - Host: `localhost`

### VS Code

1. Installez l'extension "Extension Pack for Java"
2. Utilisez la configuration dans `.vscode/launch.json`
3. Appuyez sur F5 ou allez dans Run and Debug

### Eclipse

1. Run → Debug Configurations
2. Remote Java Application → New
3. Host: `localhost`
4. Port: `5005`
5. Cliquez sur Debug

### Utilisation

1. Lancez PostgreSQL et l'API en mode debug :
   ```bash
   ./start-debug.sh  # ou start-debug.bat sur Windows
   ```

2. Dans votre IDE, connectez-vous au port 5005

3. Placez des breakpoints dans votre code

4. Les breakpoints seront déclenchés lors de l'exécution

## Dépannage

### PostgreSQL ne démarre pas

Vérifiez que le port 5432 n'est pas déjà utilisé :
```bash
lsof -i :5432  # Mac/Linux
netstat -ano | findstr :5432  # Windows
```

### L'API ne peut pas se connecter à PostgreSQL

1. Vérifiez que PostgreSQL est bien démarré :
```bash
docker ps
```

2. Vérifiez les logs :
```bash
docker logs autolink-postgres
```

3. Testez la connexion :
```bash
docker exec -it autolink-postgres psql -U postgres -d autolink
```
