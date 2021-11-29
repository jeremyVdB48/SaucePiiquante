const express = require('express'); //npm install express
const router = express.Router(); 
const userCtrl = require('../controllers/user'); //donne accés à la route ...

router.post('/signup', userCtrl.signup); // route post
router.post('/login', userCtrl.login); // route post

module.exports = router; // exportation du module router