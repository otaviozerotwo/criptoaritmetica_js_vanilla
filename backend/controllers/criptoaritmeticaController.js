const criptoaritmeticaModel = require('../model/criptoaritmeticaModel');

const criptoaritmeticaController = {
  resolver: async (req, res) => {
    try {
      const { primeiraPalavra, segundaPalavra, palavraResultante } = req.body;

      const problema = [primeiraPalavra, segundaPalavra, palavraResultante];

      const metodoSelecao = req.body.metodoSelecao 
      const taxaMutacaoPercent = req.body.taxaMutacaoPercent 
      const taxaCrossoverPercent = req.body.taxaCrossoverPercent 
      const tipoCrossover = req.body.tipoCrossover 
      const metodoReinsercao = req.body.metodoReinsercao 
      const tamanhoPopulacao = req.body.tamanhoPopulacao 
      const numMaxGeracoes = req.body.numMaxGeracoes 

      const resultado = await criptoaritmeticaModel.criptoaritmeticaAG(
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