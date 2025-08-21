# Portfolio - Alan Jego

Un portfolio moderne et responsive construit avec React, Vite et CSS personnalisé.

## 🚀 Technologies utilisées

- **React 18** - Bibliothèque JavaScript pour les interfaces utilisateur
- **Vite** - Outil de build rapide et moderne
- **CSS personnalisé** - Styles sans framework CSS
- **JavaScript ES6+** - Code moderne et maintenable

## 📁 Structure du projet

```
src/
├── components/          # Composants React réutilisables
│   ├── Navigation.jsx   # Barre de navigation
│   ├── Hero.jsx        # Section d'accueil
│   ├── Portfolio.jsx   # Galerie de projets
│   ├── Experience.jsx  # Expérience et compétences
│   ├── Contact.jsx     # Formulaire de contact
│   └── *.css           # Styles CSS pour chaque composant
├── App.jsx             # Composant principal
├── main.jsx            # Point d'entrée de l'application
└── index.css           # Styles globaux et variables CSS
```

## 🛠️ Installation et démarrage

1. **Installer les dépendances :**
   ```bash
   npm install
   # ou
   pnpm install
   # ou
   yarn install
   ```

2. **Démarrer le serveur de développement :**
   ```bash
   npm run dev
   # ou
   pnpm dev
   # ou
   yarn dev
   ```

3. **Ouvrir votre navigateur :**
   L'application sera disponible à l'adresse `http://localhost:5173`

## 📦 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Construit l'application pour la production
- `npm run preview` - Prévisualise la version de production
- `npm run lint` - Vérifie le code avec ESLint

## 🎨 Personnalisation

### Variables CSS
Le projet utilise des variables CSS personnalisées dans `src/index.css` pour :
- Couleurs du thème
- Espacements
- Rayons de bordure
- Typographie

### Ajout de nouveaux composants
1. Créez un nouveau fichier `.jsx` dans `src/components/`
2. Créez le fichier CSS correspondant
3. Importez et utilisez le composant dans `App.jsx`

## 📱 Responsive Design

Le portfolio est entièrement responsive avec :
- Design mobile-first
- Grilles CSS flexibles
- Media queries pour différentes tailles d'écran
- Navigation mobile avec menu hamburger

## 🚀 Déploiement

Pour déployer l'application :

1. **Construire pour la production :**
   ```bash
   npm run build
   ```

2. **Les fichiers de production seront dans le dossier `dist/`**

3. **Déployer le contenu du dossier `dist/` sur votre hébergeur**

## 🔧 Configuration

### Vite
La configuration Vite se trouve dans `vite.config.js` et inclut le plugin React.

### ESLint
Configuration ESLint dans `.eslintrc.cjs` avec des règles adaptées à React.

## 📝 Fonctionnalités

- ✅ Navigation fluide entre les sections
- ✅ Animations et transitions CSS
- ✅ Formulaire de contact fonctionnel
- ✅ Design moderne et épuré
- ✅ Performance optimisée avec Vite
- ✅ Code modulaire et maintenable

## 🤝 Contribution

Ce projet est personnel mais les suggestions d'amélioration sont les bienvenues !

## 📄 Licence

Projet personnel - Tous droits réservés.
