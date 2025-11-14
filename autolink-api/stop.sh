#!/bin/bash

# Script pour arrêter l'API Spring Boot et PostgreSQL

echo "🛑 Arrêt des services AutoLink..."

# Arrêter les processus Java sur le port 8080
echo "🔍 Recherche des processus sur le port 8080..."
PIDS=$(lsof -ti :8080)

if [ -z "$PIDS" ]; then
    echo "✅ Aucun processus trouvé sur le port 8080"
else
    echo "🔄 Arrêt des processus Java (PID: $PIDS)..."
    for PID in $PIDS; do
        kill $PID 2>/dev/null && echo "   ✓ Processus $PID arrêté" || echo "   ✗ Impossible d'arrêter le processus $PID"
    done
    sleep 2
    
    # Forcer l'arrêt si nécessaire
    PIDS=$(lsof -ti :8080)
    if [ ! -z "$PIDS" ]; then
        echo "⚠️  Forçage de l'arrêt des processus restants..."
        for PID in $PIDS; do
            kill -9 $PID 2>/dev/null && echo "   ✓ Processus $PID forcé à s'arrêter" || true
        done
    fi
fi

# Arrêter PostgreSQL Docker
echo "🐘 Arrêt de PostgreSQL..."
if command -v docker-compose &> /dev/null; then
    docker-compose down 2>/dev/null || true
elif docker compose version &> /dev/null 2>&1; then
    docker compose down 2>/dev/null || true
else
    echo "⚠️  Docker Compose non trouvé, arrêt manuel de PostgreSQL nécessaire"
fi

echo "✅ Tous les services ont été arrêtés"

