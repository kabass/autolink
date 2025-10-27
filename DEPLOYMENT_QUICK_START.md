# 🚀 Déploiement Rapide en 5 minutes

## Vercel - Déploiement Express

### Étape 1 : Préparer le code
```bash
# Vérifiez que tout fonctionne
npm run build

# Si la build fonctionne, poussez sur GitHub
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Étape 2 : Créer un compte Vercel
1. Allez sur https://vercel.com
2. Cliquez sur "Sign Up"
3. Connectez-vous avec votre compte GitHub

### Étape 3 : Déployer
1. Cliquez sur "Add New Project"
2. Sélectionnez votre dépôt `autolink`
3. Vercel détectera automatiquement Next.js
4. Cliquez sur "Deploy"

### Étape 4 : C'est fait ! ✅
Votre site sera disponible sur : `https://autolink-xxx.vercel.app`

---

## Autres options gratuites

### Netlify
1. Allez sur https://www.netlify.com
2. Importez votre dépôt GitHub
3. Configurez : Build command `npm run build`, Publish directory `.next`
4. Installez le plugin Next.js : `npm install --save-dev @netlify/plugin-nextjs`

### Railway
1. Allez sur https://railway.app
2. Créez un nouveau projet
3. Connectez votre dépôt GitHub
4. Déployez automatiquement

---

**Note** : Vercel est la solution la plus simple et la plus optimale pour Next.js.

Voir `DEPLOYMENT.md` pour plus de détails.

