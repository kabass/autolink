@echo off
REM Script pour démarrer PostgreSQL et l'API Spring Boot sur Windows

echo 🚀 Démarrage d'AutoLink API avec PostgreSQL...

REM Vérifier si Docker est installé
where docker >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker n'est pas installé. Veuillez installer Docker d'abord.
    exit /b 1
)

REM Arrêter les conteneurs existants s'ils existent
echo 🛑 Arrêt des conteneurs existants...
docker compose down 2>nul

REM Démarrer PostgreSQL
echo 🐘 Démarrage de PostgreSQL...
docker compose up -d postgres

REM Attendre que PostgreSQL soit prêt
echo ⏳ Attente que PostgreSQL soit prêt...
set max_attempts=30
set attempt=0

:wait_loop
docker exec autolink-postgres pg_isready -U postgres >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ PostgreSQL est prêt!
    goto :postgres_ready
)

set /a attempt+=1
if %attempt% GEQ %max_attempts% (
    echo ❌ PostgreSQL n'a pas démarré dans le temps imparti
    exit /b 1
)

echo    Tentative %attempt%/%max_attempts%...
timeout /t 2 /nobreak >nul
goto :wait_loop

:postgres_ready

REM Vérifier si Maven est installé
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven n'est pas installé. Veuillez installer Maven d'abord.
    exit /b 1
)

REM Démarrer l'API Spring Boot
echo ☕ Démarrage de l'API Spring Boot...
echo    Profil: docker
mvn spring-boot:run -Dspring-boot.run.profiles=docker

