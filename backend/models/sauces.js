const mongoose = require('mongoose'); // npm install mongoose = facilite les interactions avec mongodb

// ON CREE LE SCHEMA DE LA SAUCE (NAME, DESCRIPTION, IMAGEURL ETC...)
  // ON INDIQUE LE TYPE DE DONNEE (STRING, NUMBER) ET SI IL ES OBLIGATOIRE OU NON (REQUIRED:) ET L'AJOUT DE DEFAULT POUR METTRE UN NOMBRE PAR DEFAULT
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true},
  mainPepper: { type: String, required: true},
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true},
  likes: { type: Number, required: false, default: 0},
  dislikes: { type: Number, required: false, default: 0 },
  usersLiked: { type: [String], required: false },
  usersDisliked: { type: [String], required: false },
});

// ON EXPORTE LE MODULE SAUCESCHEMA
module.exports = mongoose.model('Sauce', sauceSchema);