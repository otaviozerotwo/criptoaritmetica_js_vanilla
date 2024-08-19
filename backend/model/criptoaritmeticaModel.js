function criarAlfabeto(problema) {
  return [...new Set(problema.join('').replace(/\s|\+/g, ''))];
}

function gerarCromossomo(alfabeto) {
  const digitos = Array.from({ length: 10 }, (_, i) => i);
  const embaralhamento = arr => arr.sort(() => Math.random() - 0.5);
  const digitosEmbaralhados = embaralhamento(digitos);

  const cromossomo = Object.fromEntries(alfabeto.map((letra, i) => [letra, digitosEmbaralhados[i]]));

  return cromossomo;
}

function palavraParaNumero(palavra, cromossomo) {
  const numeros = palavra.split('').map(letra => cromossomo[letra]);

  return parseInt(numeros.join(''), 10);
}

function calcularFitness(problema, cromossomo) {
  const [primeiraPalavra, segundaPalavra, palavraResultante] = problema;
  const numero1 = palavraParaNumero(primeiraPalavra, cromossomo);
  const numero2 = palavraParaNumero(segundaPalavra, cromossomo);
  const resultadoCalculado = palavraParaNumero(palavraResultante, cromossomo);

  return Math.abs((numero1 + numero2) - resultadoCalculado);
}

function selecaoPorRoleta(populacao) {
  const somaFitness = populacao.reduce((soma, individuo) => soma + (1 / (individuo.fitness + 1)), 0); // Evita divisão por zero
  const limite = Math.random() * somaFitness;
  
  let acumulado = 0;

  for (let i = 0; i < populacao.length; i++) {
    acumulado += 1 / (populacao[i].fitness + 1);
    if (acumulado >= limite) {
      return populacao[i];
    }
  }

  return populacao[populacao.length - 1]; 
}

function selecaoPorTorneio(populacao, tamanhoTorneio = 3) {
  const torneio = [];
  
  for (let i = 0; i < tamanhoTorneio; i++) {
    const individuoAleatorio = populacao[Math.floor(Math.random() * populacao.length)];
    torneio.push(individuoAleatorio);
  }

  return torneio.reduce((melhor, individuo) => {
    return (individuo.fitness < melhor.fitness) ? individuo : melhor;
  });
}

function crossoverCiclico(pai1, pai2) {
  const filho1 = { ...pai1 };
  const filho2 = { ...pai2 };

  const start = Object.keys(pai1)[0];
  let current = start;

  do {
    const temp = filho1[current];
    filho1[current] = filho2[current];
    filho2[current] = temp;

    current = Object.keys(pai1).find(key => pai1[key] === filho2[current]);
  } while (current !== start);

  return [filho1, filho2];
}

function crossoverPMX(pai1, pai2) {
  const filho1 = { ...pai1 };
  const filho2 = { ...pai2 };

  const keys = Object.keys(pai1);
  const ponto1 = Math.floor(Math.random() * keys.length);
  const ponto2 = ponto1 + Math.floor(Math.random() * (keys.length - ponto1));

  const mapa1 = {};
  const mapa2 = {};

  setTimeout(() => {
    for (let i = ponto1; i < ponto2; i++) {
      const key = keys[i];
      mapa1[pai2[key]] = pai1[key];
      mapa2[pai1[key]] = pai2[key];
      filho1[key] = pai2[key];
      filho2[key] = pai1[key];
    }
  
    for (let i = 0; i < keys.length; i++) {
      if (i >= ponto1 && i < ponto2) continue;
  
      const key = keys[i];
  
      while (mapa1[filho1[key]]) {
        filho1[key] = mapa1[filho1[key]];
      }
  
      while (mapa2[filho2[key]]) {
        filho2[key] = mapa2[filho2[key]];
      }
    }
  }, 200);

  return [filho1, filho2];
}

function crossover(pai1, pai2, tipoCrossover, taxaCrossover) {
  if (Math.random() > taxaCrossover) {
    return [pai1.cromossomo, pai2.cromossomo]; // Sem crossover
  }

  let filhos;

  if (tipoCrossover === 'ciclico') {
    filhos = crossoverCiclico(pai1.cromossomo, pai2.cromossomo);
  } else if (tipoCrossover === 'pmx') {
    filhos = crossoverPMX(pai1.cromossomo, pai2.cromossomo);
  }

  return filhos;
}

function mutacao(cromossomo, taxaMutacao) {
  const novoCromossomo = { ...cromossomo };

  for (let letra in novoCromossomo) {
    if (Math.random() < taxaMutacao) {
      const alfabeto = Object.keys(novoCromossomo);
      
      const outraLetra = alfabeto.filter(l => l !== letra)[Math.floor(Math.random() * (alfabeto.length - 1))];
      
      const temp = novoCromossomo[letra];
      novoCromossomo[letra] = novoCromossomo[outraLetra];
      novoCromossomo[outraLetra] = temp;
    }
  }

  return novoCromossomo;
}

function reinsercaoOrdenada(populacao, novaPopulacao, tamanhoPopulacao) {
  const combinada = populacao.concat(novaPopulacao);

  combinada.sort((a, b) => a.fitness - b.fitness);

  return combinada.slice(0, tamanhoPopulacao);
}

function reinsercaoPuraComElitismo(populacao, novaPopulacao, tamanhoPopulacao) {
  const numElitismo = Math.floor(tamanhoPopulacao * 0.2);

  const elite = populacao.slice().sort((a, b) => a.fitness - b.fitness).slice(0, numElitismo);

  const novaPopulacaoRestante = novaPopulacao.slice(0, tamanhoPopulacao - numElitismo);

  return elite.concat(novaPopulacaoRestante);
}

async function criptoaritmeticaAG(
  problema, 
  metodoSelecao, 
  taxaMutacaoPercent, 
  taxaCrossoverPercent, 
  tipoCrossover, 
  metodoReinsercao,
  tamanhoPopulacao,
  numMaxGeracoes 
) {

  const alfabeto = criarAlfabeto(problema);
  const taxaMutacao = taxaMutacaoPercent / 100; 
  const taxaCrossover = taxaCrossoverPercent / 100; 

  let populacao = Array.from({ length: tamanhoPopulacao }, () => {
    const cromossomo = gerarCromossomo(alfabeto);

    return {
      cromossomo,
      fitness: calcularFitness(problema, cromossomo)
    };
  });

  const selecao = (metodoSelecao === 'roleta') ? selecaoPorRoleta : selecaoPorTorneio;
  const melhoresIndividuos = [];

  for (let geracao = 0; geracao < numMaxGeracoes; geracao++) {
    const novaPopulacao = [];

    while (novaPopulacao.length < tamanhoPopulacao) {
      const pai1 = selecao(populacao);
      const pai2 = selecao(populacao);
      
      let [filho1, filho2] = crossover(pai1, pai2, tipoCrossover, taxaCrossover);

      filho1 = mutacao(filho1, taxaMutacao);
      filho2 = mutacao(filho2, taxaMutacao);

      novaPopulacao.push({
        cromossomo: filho1,
        fitness: calcularFitness(problema, filho1)
      });

      if (novaPopulacao.length < tamanhoPopulacao) {
        novaPopulacao.push({
          cromossomo: filho2,
          fitness: calcularFitness(problema, filho2)
        });
      }
    }

    if (metodoReinsercao === 'ordenada') {
      populacao = reinsercaoOrdenada(populacao, novaPopulacao, tamanhoPopulacao);
    } else if (metodoReinsercao === 'elitismo') {
      populacao = reinsercaoPuraComElitismo(populacao, novaPopulacao, tamanhoPopulacao);
    }

    const melhorIndividuo = populacao.reduce((melhor, individuo) => {
      return (individuo.fitness < melhor.fitness) ? individuo : melhor;
    });

    melhoresIndividuos.push({
      geracao: geracao + 1,
      cromossomo: melhorIndividuo.cromossomo,
      fitness: melhorIndividuo.fitness
    });

    if (melhorIndividuo.fitness === 0) {
      return {
        primeiraPalavra: problema[0],
        segundaPalavra: problema[1],
        palavraResultante: problema[2],
        primeiraPalavraNumero: palavraParaNumero(problema[0], melhorIndividuo.cromossomo),
        segundaPalavraNumero: palavraParaNumero(problema[1], melhorIndividuo.cromossomo),
        palavraResultanteNumero: palavraParaNumero(problema[2], melhorIndividuo.cromossomo),
        cromossomo: melhorIndividuo.cromossomo,
        fitness: melhorIndividuo.fitness,
        melhoresIndividuos
      };
    }
  }

  const melhorIndividuo = populacao.reduce((melhor, individuo) => {
    return (individuo.fitness < melhor.fitness) ? individuo : melhor;
  });

  return {
    primeiraPalavra: problema[0],
    segundaPalavra: problema[1],
    palavraResultante: problema[2],
    primeiraPalavraNumero: palavraParaNumero(problema[0], melhorIndividuo.cromossomo),
    segundaPalavraNumero: palavraParaNumero(problema[1], melhorIndividuo.cromossomo),
    palavraResultanteNumero: palavraParaNumero(problema[2], melhorIndividuo.cromossomo),
    cromossomo: melhorIndividuo.cromossomo,
    fitness: melhorIndividuo.fitness,
    melhoresIndividuos
  };
}

module.exports = {
  criarAlfabeto,
  gerarCromossomo,
  palavraParaNumero,
  calcularFitness,
  selecaoPorRoleta,
  selecaoPorTorneio,
  crossoverCiclico,
  crossoverPMX,
  crossover,
  mutacao,
  reinsercaoOrdenada,
  reinsercaoPuraComElitismo,
  criptoaritmeticaAG
};
