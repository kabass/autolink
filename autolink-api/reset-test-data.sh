#!/bin/bash

# Script pour réinitialiser les données de test

echo "🔄 Réinitialisation des données de test..."

# Vérifier si Docker est installé
if ! command -v docker &> /dev/null; then
    echo "❌ Docker n'est pas installé."
    exit 1
fi

# Vérifier si le conteneur PostgreSQL est en cours d'exécution
if ! docker ps | grep -q autolink-postgres; then
    echo "⚠️  PostgreSQL n'est pas démarré. Démarrage..."
    if command -v docker-compose &> /dev/null; then
        docker-compose up -d postgres
    else
        docker compose up -d postgres
    fi
    sleep 5
fi

echo "🗑️  Suppression des données existantes..."

# Supprimer toutes les données
docker exec -i autolink-postgres psql -U postgres -d autolink << EOF
TRUNCATE TABLE favorites CASCADE;
TRUNCATE TABLE vehicle_features CASCADE;
TRUNCATE TABLE vehicle_images CASCADE;
TRUNCATE TABLE vehicles CASCADE;
TRUNCATE TABLE users CASCADE;
EOF

if [ $? -eq 0 ]; then
    echo "✅ Données supprimées avec succès"
    echo "📝 Les données de test seront rechargées au prochain démarrage de l'API"
    echo ""
    echo "Pour recharger les données maintenant, redémarrez l'API :"
    echo "   ./start.sh"
else
    echo "❌ Erreur lors de la suppression des données"
    exit 1
fi

