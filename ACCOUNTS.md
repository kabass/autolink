# 📋 Comptes Utilisateurs - AutoLink

## 🔐 Identifiants de connexion

Tous les mots de passe sont identiques : **`password`**

---

## 👨‍💼 Superviseur (Admin)

**Email :** `amadou.sarr@email.com`  
**Mot de passe :** `password`  
**Nom :** Amadou Sarr  
**Téléphone :** +221 33 555 44 33  
**Rôle :** Supervisor  
**Permissions :**
- ✅ Peut vendre
- ✅ Peut acheter
- ✅ Peut louer
- ✅ Peut superviser
- ✅ Peut gérer les utilisateurs

**Accès :** 
- Dashboard superviseur : `/supervisor`
- Gestion utilisateurs : `/supervisor/users`

---

## 🏪 Vendeur (Seller)

**Email :** `marie.diop@email.com`  
**Mot de passe :** `password`  
**Nom :** Marie Diop  
**Téléphone :** +221 33 987 65 43  
**Rôle :** Seller (Vendeur)  
**Abonnement :** Premium (expire le 31/12/2024) ✅  
**Permissions :**
- ✅ Peut vendre
- ✅ Peut acheter
- ✅ Peut louer
- ❌ Ne peut pas superviser
- ❌ Ne peut pas gérer les utilisateurs

**Accès :**
- Profil vendeur : `/profile`
- Mes annonces : `/profile/my-ads`
- Devenir vendeur : `/become-seller`

---

## 🛒 Acheteur (Buyer)

**Email :** `jean.dupont@email.com`  
**Mot de passe :** `password`  
**Nom :** Jean Dupont  
**Téléphone :** +221 33 123 45 67  
**Rôle :** Buyer (Acheteur)  
**Vérifié :** ✅ Oui  
**Permissions :**
- ❌ Ne peut pas vendre
- ✅ Peut acheter
- ✅ Peut louer
- ❌ Ne peut pas superviser
- ❌ Ne peut pas gérer les utilisateurs

**Accès :**
- Profil : `/profile`
- Favoris : `/favorites`
- Messages : `/profile/messages`

---

## 🔑 Comment se connecter

1. Allez sur la page de connexion : `/auth`
2. Entrez un email et le mot de passe `password`
3. Cliquez sur "Se connecter"

### Page de connexion
```
URL : http://localhost:3000/auth
```

---

## 📝 Notes importantes

- **Mode développement** : Tous les utilisateurs ont le même mot de passe pour simplifier les tests
- **Production** : Remplacez ces identifiants par un système d'authentification sécurisé
- **Données mockées** : Les utilisateurs sont stockés en dur dans le code (AuthContext.tsx)

---

## 🎯 Tester les différents rôles

### Tester le rôle Superviseur
```bash
Email: amadou.sarr@email.com
Password: password
```

### Tester le rôle Vendeur
```bash
Email: marie.diop@email.com
Password: password
```

### Tester le rôle Acheteur
```bash
Email: jean.dupont@email.com
Password: password
```

---

## 🚀 En production

Pour un vrai déploiement, vous devrez :
1. Implémenter une vraie base de données
2. Utiliser un système d'authentification sécurisé (Auth0, Clerk, Firebase Auth)
3. Hasher les mots de passe (bcrypt)
4. Implémenter la réinitialisation de mot de passe
5. Ajouter la vérification d'email
6. Gérer les sessions sécurisées

---

## 📚 Code source

Les comptes sont définis dans : `src/contexts/AuthContext.tsx`

