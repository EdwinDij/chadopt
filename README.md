# Projet Fullstack - Application CRUD

## Contexte

Mise en place d'une application CRUD en 24 heures avec des spécifications détaillées.

## Mise en place du backend

### Installation des dépendances

Dans le dossier backend, exécutez l'une des commandes suivantes en fonction de votre gestionnaire de paquets préféré :

```
npm install
# ou
pnpm install
# ou
yarn install
```
Renommez le fichier .env-template en .env et renseignez les informations de votre base de données. Exemple :

```
DB_HOST=[l'host de ma base de données]
DB_PASSWORD=[le mot de passe de ma base de données]
DB_USER=[l'utilisateur de ma base de données]
DB_NAME=[le nom de ma base de données]
```

Notez que ce projet utilise PostgreSQL ; assurez-vous de vérifier le dialecte de votre base de données. Le backend est accessible sur le port 3000.

Après l'installation des dépendances et la configuration de votre fichier .env, lancez le serveur avec l'une des commandes suivantes :
```
npm start
# ou
pnpm start
# ou
yarn start
```

## Mise en place du frontend

### Installation des dépendances

Dans le dossier frontend, exécutez la commande suivante en fonction de votre gestionnaire de paquets préféré :
```
npm install
# ou
pnpm install
# ou
yarn install
```

Après l'installation des dépendances, lancez l'application en mode développement avec l'une des commandes suivantes :
```
npm run dev
# ou
pnpm run dev
# ou
yarn run dev
```

___________________________________________________________________________

Pour cette application, plusieurs fonctionnalités peuvent être ajoutées ultérieurement :

  - Un système d'authentification avec Google, Facebook, Twitter.   
  - L'utilisation de Redux pour une meilleure gestion des états.   
  - Un système de notifications.   
  - Une messagerie instantanée.   
  - Un sitemap pour un meilleur référencement, étant donné que l'application est développée en ReactJS.   
  - Des animations.   
  - Et d'autres fonctionnalités à explorer.   
