//IMPORTATION DES PACKAGES, ROUTES EN UTILISANT DES CONSTANTE ET REQUIRE

const express       = require("express"); //npm install --save express = framework qui simplifie le code par plusieurs fonctionnalités (outils, plugin et paquets)
const bodyParser    = require("body-parser"); //npm install --save body-parser = middleware qui prend en charge le format JSON
const mongoose      = require("mongoose"); // npm install --save mongoose = facilite les interactions avec notre base de données MongoDB
const morgan        = require("morgan"); // npm install --save-dev morgan = génère automatiquement un journal de toutes mes requètes

const userRoutes    = require("./routes/user"); // declaration d'une constante qui amenera directement vers ./routes/user
const saucesRoutes  = require('./routes/sauces'); // declaration d'une constante qui amenera directement vers ./routes/sauces
const path          = require("path"); //


const app = express();


// CONNEXION A LA BASE DE DONNEES MONGODB AVEC UTILISATION DE PROMESSE EN CAS DE REUSSITE OU D'ECHEC 
mongoose.connect('mongodb+srv://gegette2:gegette69@cluster0.kfr51.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !')) // si connexion établie
  .catch(() => console.log('Connexion à MongoDB échouée !')); // si echec



// (MIDDLEWARE) AJOUT DES HEADERS POUR ACCEDER A L'API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); //permet l'accés depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); //permet d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); //permet d' envoyer toutes les requetes mentionnées (put, post etc...)
    next();
  });

// MIDDLEWARE GLOBAL
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);
app.use("/images", express.static(path.join(__dirname, "/images")));

// EXPORTATION DES MODULES = APP
module.exports = app;