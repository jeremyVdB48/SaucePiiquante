const express = require('express'); //npm install express = 
const router = express.Router(); // permet de créer des routeurs séparés
const auth = require('../middleware/auth'); //donne accés à la route ...
const sauceCtrl = require('../controllers/sauces'); //donne accés à la route ...
const multer = require("../middleware/multer-config"); //donne accés à la route ...

// ROUTE QUE DOIT PRENDRE CHAQUE POST,GET,DELETE ET PUT
router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauce);
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router; // on exporte le module router