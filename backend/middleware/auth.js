const jwt = require('jsonwebtoken'); // npm install --save jsonwebtoken = crée et vérifie les tokens d'authentification
require('dotenv').config();

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // nous extrayons le token du header Authorization de la requête entrante.
    const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN ); // la fonction verify permet de decoder le token si le résultat n'est pas valide alors une erreur sera générée
    const userId = decodedToken.userId; // on extrait l'id utilisateur du token
    if (req.body.userId && req.body.userId !== userId) { // si la demande contient un ID utilisateur, nous le comparons à celui extrait du token et si il es different il renverra une érreur
      throw 'Invalid user ID';
    } else {
      
      next(); // si tous fonctionne on passe l'exécution avec next()
    }

  } catch {
    res.status(401).json({
      error: new Error('Requete invalide !')
    });
  }
};