const criptoaritmeticaModel = require('../model/criptoaritmeticaModel');

const criptoaritmeticaController = {
  resolver: async (req, res) => {
    try {
      const { primeiraPalavra, segundaPalavra, palavraResultante } = req.body;

      const problema = [primeiraPalavra, segundaPalavra, palavraResultante];

      const metodoSelecao = req.body.metodoSelecao //|| 'torneio'; 
      const taxaMutacaoPercent = req.body.taxaMutacaoPercent //|| 5; 
      const taxaCrossoverPercent = req.body.taxaCrossoverPercent //|| 60; 
      const tipoCrossover = req.body.tipoCrossover //|| 'pmx';
      const metodoReinsercao = req.body.metodoReinsercao //|| 'ordenada'; 
      const tamanhoPopulacao = req.body.tamanhoPopulacao //|| 100; 
      const numMaxGeracoes = req.body.numMaxGeracoes //|| 50

      const resultado = criptoaritmeticaModel.criptoaritmeticaAG(
        problema,
        metodoSelecao,
        taxaMutacaoPercent,
        taxaCrossoverPercent,
        tipoCrossover,
        metodoReinsercao,
        tamanhoPopulacao,
        numMaxGeracoes
      );

      res.status(200).json({ resultado, message: 'Algoritmo executado com sucesso!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
};

module.exports = criptoaritmeticaController;