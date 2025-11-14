# Guide de débogage - AutoLink API

Ce guide explique comment déboguer l'API Spring Boot dans différents IDEs.

## Prérequis

- PostgreSQL doit être démarré (via Docker Compose)
- L'API doit être lancée en mode debug

## Méthode 1 : Script de démarrage en mode debug

### Étape 1 : Démarrer en mode debug

**Linux/Mac:**
```bash
./start-debug.sh
```

**Windows:**
```cmd
start-debug.bat
```

Le script va :
1. Démarrer PostgreSQL
2. Lancer l'API en mode debug sur le port **5005**

### Étape 2 : Connecter votre IDE

Suivez les instructions ci-dessous selon votre IDE.

## IntelliJ IDEA

### Option A : Configuration automatique

1. Ouvrez le projet dans IntelliJ IDEA
2. Allez dans **Run → Edit Configurations**
3. Vous devriez voir "Debug Spring Boot" (fichier `.idea/runConfigurations/Debug_Spring_Boot.xml`)
4. Cliquez sur le bouton **Debug** (icône bug)

### Option B : Configuration manuelle

1. **Run → Edit Configurations**
2. Cliquez sur **"+"** → **Spring Boot**
3. Configurez :
   - **Name**: `Debug Spring Boot`
   - **Main class**: `com.autolink.api.AutolinkApiApplication`
   - **Active profiles**: `docker`
   - **VM options**: `-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005`
   - Cochez **"Debug"**
4. Cliquez sur **OK** puis **Debug**

### Option C : Remote Debug (si l'API tourne déjà)

1. **Run → Edit Configurations**
2. Cliquez sur **"+"** → **Remote JVM Debug**
3. Configurez :
   - **Name**: `Remote Debug - AutoLink API`
   - **Host**: `localhost`
   - **Port**: `5005`
4. Cliquez sur **OK** puis **Debug**

## VS Code

### Configuration

1. Installez l'extension **"Extension Pack for Java"** si ce n'est pas déjà fait
2. Le fichier `.vscode/launch.json` est déjà configuré
3. Ouvrez le panneau **Run and Debug** (Ctrl+Shift+D / Cmd+Shift+D)
4. Sélectionnez **"Launch Spring Boot App (Debug)"** ou **"Debug Spring Boot App"**
5. Cliquez sur le bouton **Play** ou appuyez sur **F5**

### Utilisation

- **F5** : Démarrer le débogage
- **F9** : Toggle breakpoint
- **F10** : Step over
- **F11** : Step into
- **Shift+F11** : Step out

## Eclipse

### Configuration

1. **Run → Debug Configurations**
2. **Remote Java Application** → Cliquez droit → **New**
3. Configurez :
   - **Name**: `AutoLink API Debug`
   - **Project**: `autolink-api`
   - **Host**: `localhost`
   - **Port**: `5005`
4. Cliquez sur **Debug**

## Utilisation du débogueur

### Placer des breakpoints

1. Ouvrez un fichier Java (ex: `VehicleController.java`)
2. Cliquez dans la marge à gauche du numéro de ligne
3. Un point rouge apparaît = breakpoint actif

### Types de breakpoints

- **Line breakpoint** : S'arrête à une ligne spécifique
- **Conditional breakpoint** : S'arrête seulement si une condition est vraie
- **Method breakpoint** : S'arrête à l'entrée d'une méthode

### Inspecter les variables

Quand le programme s'arrête sur un breakpoint :
- **Variables** : Voir toutes les variables locales
- **Watch** : Surveiller des expressions spécifiques
- **Call Stack** : Voir la pile d'appels

### Exemples de débogage

#### Déboguer une requête API

1. Placez un breakpoint dans `VehicleController.searchVehicles()`
2. Lancez une requête depuis le frontend ou Postman
3. Le débogueur s'arrêtera sur le breakpoint
4. Inspectez les paramètres de la requête

#### Déboguer un service

1. Placez un breakpoint dans `VehicleService.searchVehicles()`
2. Lancez une recherche
3. Inspectez les filtres et les résultats

#### Déboguer une entité

1. Placez un breakpoint dans `VehicleRepository.save()`
2. Créez un véhicule
3. Inspectez l'entité avant sauvegarde

## Commandes Maven pour le debug

Si vous préférez lancer manuellement :

```bash
# Démarrer PostgreSQL
docker-compose up -d postgres

# Lancer l'API en mode debug
mvn spring-boot:run \
    -Dspring-boot.run.profiles=docker \
    -Dspring-boot.run.jvmArguments="-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=*:5005"
```

## Ports utilisés

- **8080** : Port de l'API Spring Boot
- **5005** : Port de débogage (JDWP)
- **5432** : Port PostgreSQL

## Dépannage

### Le débogueur ne se connecte pas

1. Vérifiez que l'API est bien lancée en mode debug
2. Vérifiez que le port 5005 n'est pas utilisé par un autre processus
3. Vérifiez les logs de l'API pour voir si le port debug est ouvert

### Les breakpoints ne se déclenchent pas

1. Vérifiez que le code source correspond à la version compilée
2. Recompilez le projet : `mvn clean compile`
3. Vérifiez que vous êtes bien connecté au débogueur

### PostgreSQL n'est pas accessible

1. Vérifiez que PostgreSQL est démarré : `docker ps`
2. Vérifiez les logs : `docker logs autolink-postgres`
3. Testez la connexion : `docker exec -it autolink-postgres psql -U postgres -d autolink`

## Astuces

- Utilisez **Conditional breakpoints** pour déboguer des cas spécifiques
- Utilisez **Logpoints** pour logger sans modifier le code
- Utilisez **Evaluate Expression** pour tester des expressions pendant le débogage
- Utilisez **Hot Reload** avec Spring DevTools pour recharger les changements sans redémarrer

