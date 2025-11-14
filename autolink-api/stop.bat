@echo off
REM Script pour arrêter l'API Spring Boot et PostgreSQL sur Windows

echo 🛑 Arrêt des services AutoLink...

REM Arrêter les processus Java sur le port 8080
echo 🔍 Recherche des processus sur le port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080 ^| findstr LISTENING') do (
    set PID=%%a
    echo 🔄 Arrêt du processus Java (PID: !PID!)...
    taskkill /PID !PID! /F >nul 2>&1
    if !ERRORLEVEL! EQU 0 (
        echo    ✓ Processus !PID! arrêté
    ) else (
        echo    ✗ Impossible d'arrêter le processus !PID!
    )
)

REM Arrêter PostgreSQL Docker
echo 🐘 Arrêt de PostgreSQL...
docker compose down 2>nul

echo ✅ Tous les services ont été arrêtés

