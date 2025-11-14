@echo off
REM Script pour démarrer PostgreSQL, Keycloak et l'API Spring Boot en mode debug sur Windows

echo 🐛 Démarrage d'AutoLink API en mode DEBUG avec PostgreSQL et Keycloak...

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

REM Créer la base de données Keycloak si elle n'existe pas
echo 🗄️  Vérification de la base de données Keycloak...
docker exec autolink-postgres psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'keycloak'" | findstr /C:"1" >nul
if %ERRORLEVEL% NEQ 0 (
    docker exec autolink-postgres psql -U postgres -c "CREATE DATABASE keycloak;"
    echo ✅ Base de données Keycloak créée
) else (
    echo ✅ Base de données Keycloak déjà existante
)

REM Démarrer Keycloak
echo 🔐 Démarrage de Keycloak...
docker compose up -d keycloak

REM Attendre que Keycloak soit prêt
echo ⏳ Attente que Keycloak soit prêt...
set max_attempts=60
set attempt=0

:keycloak_wait_loop
docker exec autolink-keycloak curl -f http://localhost:8080/health/ready >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo ✅ Keycloak est prêt!
    echo    Console admin: http://localhost:9090
    echo    Username: admin
    echo    Password: admin
    goto :keycloak_ready
)

set /a attempt+=1
if %attempt% GEQ %max_attempts% (
    echo ⚠️  Keycloak n'a pas démarré dans le temps imparti, mais on continue...
    echo    Vous pouvez vérifier les logs avec: docker compose logs keycloak
    goto :keycloak_ready
)

echo    Tentative %attempt%/%max_attempts%...
timeout /t 2 /nobreak >nul
goto :keycloak_wait_loop

:keycloak_ready

REM Vérifier si Maven est installé
where mvn >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Maven n'est pas installé. Veuillez installer Maven d'abord.
    exit /b 1
)

REM Démarrer l'API Spring Boot en mode debug
echo 🐛 Démarrage de l'API Spring Boot en mode DEBUG...
echo    Profil: docker
echo    Port debug: 5005
echo    Connectez votre IDE au port 5005 pour le débogage
echo.
mvn spring-boot:run -Dspring-boot.run.profiles=docker -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=*:5005"

