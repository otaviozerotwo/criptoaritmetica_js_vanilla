// Recupera os dados da query string
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const dados = JSON.parse(decodeURIComponent(urlParams.get('dados')));

// Seleciona o elemento <pre> onde o JSON será exibido
const jsonDisplay = document.getElementById('jsonDisplay');

// Exibe o JSON formatado
jsonDisplay.textContent = JSON.stringify(dados, null, 2); // Formatação com 2 espaços