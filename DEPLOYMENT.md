# Guide de Déploiement Gratuit - AutoLink

Ce guide présente plusieurs solutions **100% gratuites** pour déployer votre application AutoLink en ligne.

## 🚀 Option 1 : Vercel (Recommandé)

**Vercel est le créateur de Next.js et offre le meilleur support pour les projets Next.js.**

### Avantages
- ✅ 100% gratuit pour les projets personnels
- ✅ Déploiement ultra-rapide
- ✅ CI/CD automatique (push sur GitHub = déploiement automatique)
- ✅ HTTPS par défaut
- ✅ CDN global pour des performances optimales
- ✅ Support complet de Next.js et toutes ses fonctionnalités
- ✅ Analytics gratuit
- ✅ Domaines personnalisés gratuits

### Étapes de déploiement

1. **Créer un compte Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec votre compte GitHub/GitLab/Bitbucket

2. **Pousser votre code sur GitHub**
   ```bash
   # Si vous n'avez pas encore de dépôt Git
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/VOTRE-USERNAME/autolink.git
   git push -u origin main
   ```

3. **Importer votre projet sur Vercel**
   - Connectez-vous à Vercel
   - Cliquez sur "Add New Project"
   - Importez votre dépôt GitHub
   - Vercel détectera automatiquement Next.js
   - Cliquez sur "Deploy"

4. **Configuration (optionnel)**
   - Si vous avez besoin de variables d'environnement, ajoutez-les dans les paramètres du projet
   - Pour ce projet, aucune variable d'environnement n'est nécessaire pour l'instant

5. **C'est tout !**
   - Votre site sera en ligne en quelques minutes
   - URL : `https://votre-projet.vercel.app`

### Configuration supplémentaire (optionnel)
Vous pouvez ajouter un fichier `vercel.json` à la racine pour des configurations avancées :
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

---

## 🎯 Option 2 : Netlify

**Netlify est une excellente alternative avec de généreuses limites gratuites.**

### Avantages
- ✅ 100% gratuit pour les projets personnels
- ✅ Déploiement automatique depuis Git
- ✅ HTTPS gratuit
- ✅ CDN global
- ✅ Formulaires et fonctions serverless gratuits
- ✅ Domaine personnalisé gratuit

### Étapes de déploiement

1. **Créer un compte Netlify**
   - Allez sur [netlify.com](https://www.netlify.com)
   - Connectez-vous avec GitHub

2. **Importer votre projet**
   - Cliquez sur "Add new site" → "Import an existing project"
   - Connectez votre dépôt GitHub
   - Configurez le build :
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Cliquez sur "Deploy site"

3. **Configuration**
   - Pour Next.js avec App Router, ajoutez ce fichier `netlify.toml` :
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [[plugins]]
     package = "@netlify/plugin-nextjs"
   ```

4. **Installation du plugin Next.js (recommandé)**
   ```bash
   npm install --save-dev @netlify/plugin-nextjs
   ```

---

## 🚂 Option 3 : Railway

**Railway offre un plan gratuit avec 500 heures de runtime par mois.**

### Avantages
- ✅ 500 heures gratuites/mois
- ✅ Déploiement simple
- ✅ Base de données gratuite incluse
- ✅ HTTPS automatique

### Étapes de déploiement

1. **Créer un compte Railway**
   - Allez sur [railway.app](https://railway.app)
   - Connectez-vous avec GitHub

2. **Créer un nouveau projet**
   - Cliquez sur "New Project"
   - Sélectionnez "Deploy from GitHub repo"
   - Choisissez votre dépôt

3. **Configuration**
   - Railway détectera automatiquement Next.js
   - Le déploiement démarrera automatiquement

---

## 🎨 Option 4 : Render

**Render offre un plan gratuit avec certaines limitations.**

### Avantages
- ✅ Plan gratuit disponible
- ✅ Auto-déploiement depuis Git
- ✅ HTTPS gratuit
- ⚠️ Mise en veille après 15 minutes d'inactivité (plan gratuit)

### Étapes de déploiement

1. **Créer un compte Render**
   - Allez sur [render.com](https://render.com)
   - Connectez-vous avec GitHub

2. **Créer un Web Service**
   - Cliquez sur "New" → "Web Service"
   - Connectez votre dépôt
   - Configurez :
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`

3. **Déployer**
   - Cliquez sur "Create Web Service"

---

## 📊 Comparaison des solutions

| Plateforme | Limites gratuites | Avantages | Inconvénients |
|------------|------------------|-----------|---------------|
| **Vercel** | 100 GB bande passante/mois | Optimisé pour Next.js, ultra-rapide | Recommandé |
| **Netlify** | 100 GB bande passante/mois | Formulaires gratuits | Configurez le plugin Next.js |
| **Railway** | 500h runtime/mois | Flexible, DB gratuite | Limite d'heures |
| **Render** | Mise en veille après 15 min | Simple | Premier chargement lent |

---

## ✅ Ma recommandation : Vercel

Pour votre projet AutoLink, **je recommande fortement Vercel** car :
1. C'est le créateur de Next.js
2. Configuration minimale requise
3. Performances optimales
4. Déploiements instantanés
5. Entièrement gratuit pour les projets personnels

---

## 🚀 Déploiement Rapide (5 minutes)

### Étapes rapides avec Vercel :

1. **Pousser sur GitHub**
   ```bash
   git push origin main
   ```

2. **Aller sur vercel.com** et importer votre repo

3. **Clic Deploy** - C'est tout !

4. **Accéder à votre site** : `https://votre-projet.vercel.app`

---

## 📝 Configuration recommandée

### Avant de déployer, assurez-vous que :

1. ✅ Votre code est sur GitHub
2. ✅ `package.json` contient le script `build`
3. ✅ Aucune erreur lors de `npm run build`
4. ✅ `.gitignore` contient `.next` et `node_modules`

### Fichier `.gitignore` (vérifiez qu'il existe)
```
node_modules
.next
.env*.local
.DS_Store
*.log
```

---

## 🔧 Configuration avancée (Optionnel)

### Variables d'environnement (si nécessaire plus tard)

Si vous ajoutez une base de données ou des API keys plus tard :

1. Sur Vercel :
   - Projet → Settings → Environment Variables
   - Ajoutez vos variables

2. Localement :
   - Créez un fichier `.env.local` :
   ```
   NEXT_PUBLIC_API_URL=https://votre-api.com
   DATABASE_URL=postgresql://...
   ```

### Domaines personnalisés

Sur Vercel :
- Projet → Settings → Domains
- Ajoutez votre domaine
- Suivez les instructions DNS

---

## ❓ Problèmes courants

### Erreur de build
```bash
npm run build
# Corrigez les erreurs avant de pousser sur GitHub
```

### Variables d'environnement
Vérifiez que toutes les variables nécessaires sont ajoutées dans les paramètres de votre plateforme.

### Images non trouvées
Vérifiez que vos images sont dans le dossier `public/`.

---

## 📞 Besoin d'aide ?

- Documentation Vercel : [vercel.com/docs](https://vercel.com/docs)
- Documentation Next.js : [nextjs.org/docs](https://nextjs.org/docs)
- Support GitHub : Créez une issue sur votre dépôt

---

## 🎉 Prochaines étapes

Une fois déployé :

1. ✅ Partagez l'URL avec vos utilisateurs
2. ✅ Configurez un domaine personnalisé
3. ✅ Surveillez les performances avec les analytics
4. ✅ Configurez des notifications pour les déploiements

**Bon déploiement ! 🚀**

