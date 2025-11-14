#!/bin/bash

# Script pour démarrer PostgreSQL, Keycloak et l'API Spring Boot en mode debug

set -e

echo "🐛 Démarrage d'AutoLink API en mode DEBUG avec PostgreSQL et Keycloak..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé. Veuillez installer Docker d'abord."
    exit 1
fi

# Vérifier si Docker Compose est installé
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    echo "❌ Docker Compose n'est pas installé. Veuillez installer Docker Compose d'abord."
    exit 1
fi

# Arrêter les conteneurs existants s'ils existent
echo "🛑 Arrêt des conteneurs existants..."
docker-compose down 2>/dev/null || docker compose down 2>/dev/null || true

# Démarrer PostgreSQL
echo "🐘 Démarrage de PostgreSQL..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d postgres
else
    docker compose up -d postgres
fi

# Attendre que PostgreSQL soit prêt
echo "⏳ Attente que PostgreSQL soit prêt..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if docker exec autolink-postgres pg_isready -U postgres &> /dev/null; then
        echo "✅ PostgreSQL est prêt!"
        break
    fi
    attempt=$((attempt + 1))
    echo "   Tentative $attempt/$max_attempts..."
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "❌ PostgreSQL n'a pas démarré dans le temps imparti"
    exit 1
fi

# Créer la base de données Keycloak si elle n'existe pas
echo "🗄️  Vérification de la base de données Keycloak..."
docker exec autolink-postgres psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'keycloak'" | grep -q 1 || \
docker exec autolink-postgres psql -U postgres -c "CREATE DATABASE keycloak;" && \
echo "✅ Base de données Keycloak créée ou déjà existante"

# Démarrer Keycloak
echo "🔐 Démarrage de Keycloak..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d keycloak
else
    docker compose up -d keycloak
fi

# Attendre que Keycloak soit prêt
echo "⏳ Attente que Keycloak soit prêt..."
if ! command -v curl &> /dev/null; then
    echo "❌ curl n'est pas installé. Installez-le pour vérifier l'état de Keycloak."
    exit 1
fi
max_attempts=60
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if curl -fs http://localhost:9090/health/ready &> /dev/null; then
        echo "✅ Keycloak est prêt!"
        echo "   Console admin: http://localhost:9090"
        echo "   Username: admin"
        echo "   Password: admin"
        break
    fi
    attempt=$((attempt + 1))
    echo "   Tentative $attempt/$max_attempts..."
    sleep 2
done

if [ $attempt -eq $max_attempts ]; then
    echo "⚠️  Keycloak n'a pas démarré dans le temps imparti, mais on continue..."
    echo "   Vous pouvez vérifier les logs avec: docker-compose logs keycloak"
fi

# Vérifier si Maven est installé
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven n'est pas installé. Veuillez installer Maven d'abord."
    exit 1
fi

# Libérer le port de debug si nécessaire
DEBUG_PORT=5005
if lsof -ti tcp:$DEBUG_PORT > /dev/null; then
    echo "⚠️  Port $DEBUG_PORT déjà utilisé. Tentative d'arrêt des processus..."
    for pid in $(lsof -ti tcp:$DEBUG_PORT); do
        echo "   ➤ Arrêt du processus PID $pid"
        kill "$pid" 2>/dev/null || true
    done
    sleep 2
    if lsof -ti tcp:$DEBUG_PORT > /dev/null; then
        echo "   ❗ Le port $DEBUG_PORT est toujours occupé. Arrêt forcé..."
        for pid in $(lsof -ti tcp:$DEBUG_PORT); do
            kill -9 "$pid" 2>/dev/null || true
        done
        sleep 1
        if lsof -ti tcp:$DEBUG_PORT > /dev/null; then
            echo "❌ Impossible de libérer le port $DEBUG_PORT. Abandon."
            exit 1
        fi
    fi
    echo "✅ Port $DEBUG_PORT libéré."
fi

# Démarrer l'API Spring Boot en mode debug
echo "🐛 Démarrage de l'API Spring Boot en mode DEBUG..."
echo "   Profil: docker"
echo "   Port debug: $DEBUG_PORT"
echo "   Connectez votre IDE au port $DEBUG_PORT pour le débogage"
echo ""
mvn spring-boot:run \
    -Dspring-boot.run.profiles=docker \
    -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=*:5005"

