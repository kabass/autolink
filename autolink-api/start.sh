#!/bin/bash

# Script pour démarrer PostgreSQL et l'API Spring Boot

set -e

echo "🚀 Démarrage d'AutoLink API avec PostgreSQL..."

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

# Vérifier si Maven est installé
if ! command -v mvn &> /dev/null; then
    echo "❌ Maven n'est pas installé. Veuillez installer Maven d'abord."
    exit 1
fi

# Démarrer l'API Spring Boot
echo "☕ Démarrage de l'API Spring Boot..."
echo "   Profil: docker"
mvn spring-boot:run -Dspring-boot.run.profiles=docker

