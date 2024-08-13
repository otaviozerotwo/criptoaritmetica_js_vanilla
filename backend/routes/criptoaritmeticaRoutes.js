const express = require('express');
const router = express.Router();
const criptoaritmeticaController = require('../controllers/criptoaritmeticaController');

router
  .route('/criptoaritmetica')
  .post((req, res) => criptoaritmeticaController.resolver(req, res));

  router
  .route('/criptoaritmetica')
  .get((req, res) => criptoaritmeticaController.getAll(req, res));

module.exports = router;