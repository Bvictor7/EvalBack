Portfolio Backend API
Description
Cette API REST permet de gérer un portfolio dynamique. Elle offre des fonctionnalités pour :

Gérer les compétences (CRUD) via une base de données MongoDB.
Uploader des images sur Cloudinary avec Multer.
Gérer l'authentification sécurisée avec JWT et bcrypt.
Protéger certaines routes (par exemple, la suppression d'une compétence réservée aux administrateurs).
Technologies utilisées
Backend : Node.js, Express
Base de données : MongoDB avec Mongoose
Authentification : JWT, bcrypt
Upload d'images : Cloudinary, Multer
Sécurité et logging : Helmet, CORS, Morgan, cookie-parser
Installation
Cloner le repository :

bash
Copier
git clone https://github.com/votre-utilisateur/portfolio-backend.git
cd portfolio-backend
Installer les dépendances :

bash
Copier
npm install
Créer un fichier .env à la racine du projet et ajouter les variables d'environnement suivantes :

env
Copier
PORT=5000
MONGO_URI=<votre_connection_mongodb>
JWT_SECRET=<votre_secret_jwt>
FRONTEND_URL=http://localhost:3000
CLOUDINARY_CLOUD_NAME=<votre_cloud_name>
CLOUDINARY_API_KEY=<votre_api_key>
CLOUDINARY_API_SECRET=<votre_api_secret>
Lancer le serveur en mode développement :

bash
Copier
npm run dev
Le serveur sera démarré sur http://localhost:5000.

Endpoints API
Authentification
Inscription : POST /api/auth/register
Corps de la requête (JSON) :

json
Copier
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "motdepasse",
  "role": "user"
}
Note : La création d'un administrateur peut être contrôlée par un middleware ou un script séparé.

Connexion : POST /api/auth/login
Corps de la requête (JSON) :

json
Copier
{
  "email": "john@example.com",
  "password": "motdepasse"
}
Compétences (Skills)
Récupérer toutes les compétences : GET /api/skills
Récupérer une compétence par son ID : GET /api/skills/:id
Créer une compétence : POST /api/skills
Exemple de corps de requête (JSON) :
json
Copier
{
  "title": "HTML",
  "category": "Frontend",
  "level": "débutant",
  "image": "URL de l'image sur Cloudinary"
}
Mettre à jour une compétence : PUT /api/skills/:id
Supprimer une compétence : DELETE /api/skills/:id
Important : Cette route est protégée. Elle nécessite que l'utilisateur soit authentifié et qu'il ait le rôle admin.

Upload d'image
Uploader une image : POST /api/skills/upload
Attendez-vous à une requête de type multipart/form-data avec le fichier sous la clé image.
Paramètres utilisateur (Settings)
Récupérer les paramètres : GET /api/settings/:userId
Mettre à jour les paramètres : PUT /api/settings/:userId
Test de l'API
Utilise un outil comme Postman ou Insomnia pour tester les endpoints ci-dessus.

Pour accéder aux routes protégées, n'oublie pas d'inclure le token JWT dans les cookies ou dans le header Authorization (format : Bearer <token>).
Déploiement
Pour déployer cette API, tu peux utiliser des plateformes telles que Heroku, Render, ou Railway.
Assure-toi que toutes les variables d'environnement sont correctement configurées sur la plateforme choisie.

# evalBack
