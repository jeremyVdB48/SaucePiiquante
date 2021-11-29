const bcrypt = require("bcrypt"); // npm install bcrypt = package de cryptage 
const User = require("../models/user"); // donne accés à la route ...
const jwt = require("jsonwebtoken"); // npm install jsonwebtoken = créér et vérifier des tokens

// CRYPTE LE MOT DE PASSE ET L'ENREGISTRE
exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10) // hash est une fonction de bcrypt qui va crypter mon mot de passe pour plus de sécurité
    .then(hash => {  
      const user = new User({ // nous créons un utilisateur
        email: req.body.email,
        password: hash,
      });
      user.save() // enregistre dans la base de données le nouvel utilisateur
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // vérifie que l'e-mail entré par l'utilisateur correspond à un utilisateur existant
      .then(user => {
        if (!user) { // si l'utilisateur ne correspond pas
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) { // si le mot de passe ne correspons pas
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({ // si les informations correspondent 
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };