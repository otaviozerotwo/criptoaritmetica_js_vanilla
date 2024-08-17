const url = 'http://localhost:3000/api/criptoaritmetica';

const formPrincipal = document.querySelector('#formPrincipal');
const containerResultado = document.querySelector('#containerResultado');

const primeiraPalavraElement = document.querySelector('#primeiraPalavraSpan');
const segundaPalavraElement = document.querySelector('#segundaPalavraSpan');
const palavraResultanteElement = document.querySelector('#palavraResultanteSpan');
const primeiraPalavraNumeroElement = document.querySelector('#primeiraPalavraNumero');
const segundaPalavraNumeroElement = document.querySelector('#segundaPalavraNumero');
const palavraResultanteNumeroElement = document.querySelector('#palavraResultanteNumero');
const cromossomoFormatadoElement = document.querySelector('#cromossomoFormatado');
const fitnessElement = document.querySelector('#fitness');
const classResultado = document.querySelector('.resultado');
const classMensagemErroAPI = document.querySelector('.mensagem-erro-api');
const mensagemErroAPI = document.querySelector('#mensagemErroAPI');
const melhoresIndividuos = document.querySelector('#melhoresIndividuos');

formPrincipal.addEventListener('submit', async (event) => {
  event.preventDefault(); // Previne o comportamento padrão do formulário

  // Captura os valores do formulário
  const primeiraPalavra = document.querySelector('#primeiraPalavra').value.toUpperCase();
  const segundaPalavra = document.querySelector('#segundaPalavra').value.toUpperCase();
  const palavraResultante = document.querySelector('#palavraResultante').value.toUpperCase();
  const metodoSelecao = document.querySelector('input[name="metodoSelecao"]:checked').value;
  const taxaMutacaoPercent = document.querySelector('input[name="taxaMutacaoPercent"]:checked').value;
  const tipoCrossover = document.querySelector('input[name="tipoCrossover"]:checked').value;
  const taxaCrossoverPercent = document.querySelector('input[name="taxaCrossoverPercent"]:checked').value;
  const metodoReinsercao = document.querySelector('input[name="metodoReinsercao"]:checked').value;
  const tamanhoPopulacao = document.querySelector('#tamPopulacao').value;
  const numMaxGeracoes = document.querySelector('#numGeracoes').value;

  // Cria o objeto com os parâmetros
  const params = {
    primeiraPalavra,
    segundaPalavra,
    palavraResultante,
    metodoSelecao,
    taxaMutacaoPercent,
    tipoCrossover, 
    taxaCrossoverPercent, 
    metodoReinsercao,
    tamanhoPopulacao,
    numMaxGeracoes 
  };

  try {
    // Envia os parâmetros via POST
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json();

    primeiraPalavraElement.textContent = data.resultado.primeiraPalavra;
    segundaPalavraElement.textContent = data.resultado.segundaPalavra;
    palavraResultanteElement.textContent = data.resultado.palavraResultante;
    primeiraPalavraNumeroElement.textContent = data.resultado.primeiraPalavraNumero;
    segundaPalavraNumeroElement.textContent = data.resultado.segundaPalavraNumero;
    palavraResultanteNumeroElement.textContent = data.resultado.palavraResultanteNumero;

    // Formata o cromossomo para exibição
    const cromossomoFormatado = Object.entries(data.resultado.cromossomo)
      .map(([letra, valor]) => `        ${letra}: ${valor}`)
      .join('<br>');

    cromossomoFormatadoElement.innerHTML = cromossomoFormatado;

    fitnessElement.textContent = data.resultado.fitness;

    melhoresIndividuos.href = `./pages/melhoresIndividuos.html?dados=${encodeURIComponent(JSON.stringify(data.resultado.melhoresIndividuos))}`;


    classMensagemErroAPI.style.display = 'none';
    classResultado.style.display = 'block';

  } catch (error) {
    mensagemErroAPI.textContent = error.message;

    classResultado.style.display = 'none';
    classMensagemErroAPI.style.display = 'block';
  }
});
