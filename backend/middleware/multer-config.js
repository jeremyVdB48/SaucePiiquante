const multer = require("multer"); // npm install multer = package de gestion de fichiers

const MIME_TYPES = { // format d'image autoriser
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png"
};

const storage = multer.diskStorage({ // indique ou enregistrer les fichiers (images)
    destination: (req, file, callback) =>{
        callback(null, "images")
    },
    filename: (req, file, callback) =>{ 
        const name = file.originalname.split(" ").join("_"); // utilise le nom d'origine et remplacement des espaces par _ (.split .join)
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() +"." + extension); // date.now ajoute une date précise
    }
});

module.exports = multer({ storage }).single("image"); // on exporte multer et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.