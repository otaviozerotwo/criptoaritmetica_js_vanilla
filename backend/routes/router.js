const router = require('express').Router();
const criptoaritmeticaRouter = require('./criptoaritmeticaRoutes');

router.use('/', criptoaritmeticaRouter);

module.exports = router;