# Configuration des Ports - AutoLink

## Ports par défaut

- **Frontend (Next.js)** : Port **3000**
- **Backend (Spring Boot API)** : Port **8080**

## Problème : Conflit de port

Si vous obtenez l'erreur `EADDRINUSE: address already in use :::8080`, cela signifie qu'un processus utilise déjà le port 8080.

### Solutions

#### 1. Arrêter le processus sur le port 8080

**Linux/Mac:**
```bash
# Trouver le processus
lsof -ti :8080

# Arrêter le processus
kill $(lsof -ti :8080)

# Ou utiliser le script
cd autolink-api
./stop.sh
```

**Windows:**
```cmd
# Trouver et arrêter le processus
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Ou utiliser le script
cd autolink-api
stop.bat
```

#### 2. Changer le port du frontend

Si vous voulez que Next.js utilise un autre port (par exemple 3000) :

```bash
# Dans autolink-web/
npm run dev
# Utilise automatiquement le port 3000
```

Ou explicitement :
```bash
npm run dev -p 3000
```

#### 3. Changer le port de l'API

Si vous voulez que l'API utilise un autre port :

1. Modifiez `autolink-api/src/main/resources/application.properties` :
```properties
server.port=8081
```

2. Mettez à jour `autolink-web/.env.local` :
```env
NEXT_PUBLIC_API_URL=http://localhost:8081/api
```

## Commandes utiles

### Vérifier les ports utilisés

**Linux/Mac:**
```bash
lsof -i :3000
lsof -i :8080
```

**Windows:**
```cmd
netstat -ano | findstr :3000
netstat -ano | findstr :8080
```

### Démarrer les services

1. **Backend (port 8080)** :
```bash
cd autolink-api
./start.sh
```

2. **Frontend (port 3000)** :
```bash
cd autolink-web
npm run dev
```

## Configuration recommandée

- **Frontend** : `http://localhost:3000`
- **Backend API** : `http://localhost:8080/api`

Ces ports ne doivent pas entrer en conflit car ils sont différents.

