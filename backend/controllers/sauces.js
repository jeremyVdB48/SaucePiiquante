const Sauces = require('../models/sauces'); //donne accés à la route ...
const fs = require("fs");// = donne accés a des fonctions pour modifier les fichiers


// ICI, ON CREE UNE INSTANCE DU MODELE SAUCE CONTENANT LES INFORMATIONS REQUISES 
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    const sauce = new Sauces({
    ...sauceObject,
    imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`    
  });
  sauce.save() // la methode save enregistre la sauce dans le base de données

  // UTILISATION DE PROMESSE AVEC UN RESULTAT DE STATUS ET UN MESSAGE
    .then(() => res.status(201).json({ message: 'Nouvelle sauce enregistrée !'}))
    .catch(error => res.status(401).json({ error }));
};

// ON CREE UNE INSTANCE POUR MODIFIER LA SAUCE
exports.modifySauce = (req, res, next) => {
  
  Sauces.findOne({_id: req.params.id }) 
  .then(sauce => {
    if(req.body.userId == sauce.userId ){

 const sauceObject = req.file ?
    {
    ...JSON.parse(req.body.sauce),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`  
    } : {...req.body};
  Sauces.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})// la methode updateOne permet de mettre à jour la sauce
  .then(() => res.status(201).json({message: 'Sauce modifiée !'}))
  .catch(error => res.status(400).json({ error }));
    

    }
  else{
    res.status(403).json({ message: "Cet utilisateur n'a pas la permission de modifier cette sauce" });
  } 
    })
  .catch(error => res.status(404).json({ error }));
 
};


// ON CREE UNE INSTANCE POUR SUPPRIMER LA SAUCE
exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id }) // la méthode findOne recherche la sauce qui a le même id que la requète
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];// 
        fs.unlink(`images/${filename}`, () => {
          Sauces.deleteOne({ _id: req.params.id }) // la méthode deleteOne supprime la sauce avec l'id selectionné
            .then(() => res.status(200).json({ message: 'Sauce supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

// RECUPERATION D' UNE SAUCE SPECIFIQUE
exports.getOneSauce = (req, res, next) => {
    Sauces.findOne({_id: req.params.id }) // findOne recupere 1 seul sauce par son id
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
  };

// RECUPERATION DE TOUTES LES SAUCES
exports.getAllSauce = (req, res, next) => {
  Sauces.find() // find recup toutes les sauces
  .then(sauces => res.status(200).json(sauces))
  .catch(error => res.status(400).json({ error }));
};


// RECUPERATION DU LIKE DU USERID ET DE L'ID DE LA SAUCE
exports.likeSauce = (req, res, next) =>{
    const like        = req.body.like;
    const utilisateur = req.body.userId;
    const choixSauce  = req.params.id;
    
console.log(like);
console.log(utilisateur);
console.log(choixSauce);

  if (like === 1) { // si on click sur le pouce vers le haut
    Sauces.updateOne({ _id: choixSauce } , {$push:{ usersLiked: utilisateur}, $inc:{ likes: +1} }) // ici on recup l'id de la sauce on utilise la methode $push pour recup l'id de l'utilisateur et on modififie avec $inc le like par un +1
   
      .then(() => res.status(200).json({ message: "J'aime !"}))
      .catch(error => res.status(400).json({ error }));

  }

  if (like === -1) { // si on click sur le pouce vers le bas
    Sauces.updateOne({ _id: choixSauce } , {$push:{ usersDisliked: utilisateur}, $inc:{ dislikes: +1} }) // ici on recup l'id de la sauce on utilise la methode $push pour recup l'id de l'utilisateur et on modififie avec $inc le dislike par un -1
   
      .then(() => res.status(200).json({ message: "J'aime pas !"}))
      .catch(error => res.status(400).json({ error }));

  }
   
  if (like === 0) { // permet à l'utilisateur de modifier son like ou son dislike
    Sauces.findOne({ _id: choixSauce })  
      .then((sauce)=>{
        if (sauce.usersLiked.includes( utilisateur )) { Sauces.updateOne({ _id: choixSauce } , {$pull:{ usersLiked: utilisateur}, $inc:{ likes: -1} }) // ici on modifie le like
          
        .then(() => res.status(200).json({ message: "J'aime retiré !"}))
        .catch((error) => res.status(400).json({ error }));

        }  
  
        if (sauce.usersDisliked.includes( utilisateur )) { Sauces.updateOne({ _id: choixSauce } , {$pull:{ usersDisliked: utilisateur}, $inc:{ dislikes: -1} }) // ici on modifie le dislike

        .then(() => res.status(200).json({ message: "Je n'aime pas retiré !"}))
        .catch((error) => res.status(400).json({ error }));
      }

      })
  }
};