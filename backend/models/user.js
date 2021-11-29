const mongoose = require("mongoose"); // npm install mongoose = facilite les interactions avec mongodb
const uniqueValidator = require('mongoose-unique-validator'); // npm install --save mongoose-unique-validator = package qui permet de pré-valider les informations avant de les enregister

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true }, // le terme unique qui vient du package unique-validator ne permet qu'une seule connexion a partir de la même adresse mail
  password: { type: String, required: true } // le mot de passe doit contenir un type String (chaine de caractère) et il es obligatoire de le remplir
});

userSchema.plugin(uniqueValidator);

// ON EXPORTE LE MODULE USERSCHEMA
module.exports = mongoose.model('User', userSchema);