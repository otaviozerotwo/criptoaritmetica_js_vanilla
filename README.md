# Calculadora Criptoaritmética

## Descrição

A **Calculadora Criptoaritmética** é uma aplicação web interativa desenvolvida para resolver quebra-cabeças criptoaritméticos (como o clássico `SEND + MORE = MONEY`) utilizando **Algoritmos Genéticos (AG)**. Na criptoaritmética, as letras de uma operação matemática representam dígitos de 0 a 9 em correspondência biunívoca. A aplicação permite que o usuário personalize os operadores evolutivos (método de seleção, taxas e tipos de crossover, taxa de mutação e método de reinserção), acompanhe a solução encontrada, visualize a atribuição de cada letra a um dígito e analise a evolução dos melhores indivíduos geração a geração.

## Propósito:
Demonstrar na prática a aplicação de conceitos de Inteligência Artificial e Computação Evolutiva na resolução de problemas de otimização combinatória e satisfação de restrições (CSP), tornando acessível a visualização do comportamento dos operadores genéticos por meio de uma interface visual interativa.

## Objetivo:
Encontrar uma atribuição ótima de dígitos decimais únicos (0 a 9) para cada letra presente nas palavras informadas, de modo que a soma aritmética seja matematicamente válida (atingindo fitness = 0), além de fornecer dados para análise comparativa de desempenho entre os diferentes métodos genéticos configuráveis.

## Público alvo: 
Estudantes, professores e pesquisadores de Ciência da Computação, Engenharia de Software e áreas afins, bem como entusiastas de Inteligência Artificial, Algoritmos Genéticos e quebra-cabeças matemáticos.

## Requisitos Funcionais 

- **[RF01] Entrada de Dados:** Permitir a inserção da primeira palavra, da segunda palavra e da palavra resultante da soma.
- **[RF02] Configuração do Método de Seleção:** Permitir a escolha entre seleção por **Roleta Viciada** e **Torneio** (tamanho 3).
- **[RF03] Configuração da Taxa de Mutação:** Permitir a escolha da taxa de mutação entre **5%** e **10%**.
- **[RF04] Configuração do Tipo de Crossover:** Permitir a escolha entre o operador **PMX** (*Partially Mapped Crossover*) e **Crossover Cíclico**.
- **[RF05] Configuração da Taxa de Crossover:** Permitir a escolha da taxa de cruzamento entre **60%** e **80%**.
- **[RF06] Configuração da Reinserção:** Permitir a escolha entre reinserção **Ordenada** e **Elitismo** (preservando os 20% melhores indivíduos).
- **[RF07] Configuração Populacional:** Permitir ajustar livremente o tamanho da população e o número máximo de gerações.
- **[RF08] Exibição de Resultados:** Apresentar a equação original, a equação resolvida com os dígitos substituídos, o cromossomo (mapeamento letra → número) e a pontuação final de fitness.
- **[RF09] Visualização das Gerações:** Disponibilizar link e página dedicada (`melhoresIndividuos.html`) para inspecionar os melhores indivíduos obtidos em cada geração.
- **[RF10] Tratamento de Erros:** Exibir mensagens de alerta claras na interface em caso de inconsistência de dados ou falha na requisição.

## Requisitos Não Funcionais

- **[RNF01] Desempenho:** Execução ágil do algoritmo genético em memória no backend, com parada antecipada assim que uma solução exata (fitness = 0) for alcançada.
- **[RNF02] Usabilidade:** Interface simples, responsiva e intuitiva em Vanilla JS e CSS, sem sobrecarga de bibliotecas pesadas.
- **[RNF03] Arquitetura Desacoplada:** Separação entre Frontend (interface estática) e Backend (API REST em Express).
- **[RNF04] Portabilidade e Deploy:** Estruturado em monorepo compatível com deploy unificado na Vercel (arquivos estáticos e Serverless Functions sob o mesmo domínio).

## Tecnologias Utilizadas

- **Frontend:** HTML5 Semântico, CSS3 Vanilla, JavaScript (ES6+), Fetch API.
- **Backend:** Node.js, Express.js, CORS.
- **Deploy & Hospedagem:** Vercel (Serverless Functions + Static Hosting).

## 📂 Estrutura do Projeto

```bash
📁 calculadora_criptoaritmetica
├── 📁 api/
│   └── 📄 index.js                         # Ponto de entrada Serverless para a Vercel
├── 📁 backend/
│   ├── 📁 controllers/
│   │   └── 📄 criptoaritmeticaController.js # Controlador que recebe e valida as requisições
│   ├── 📁 model/
│   │   └── 📄 criptoaritmeticaModel.js      # Implementação do Algoritmo Genético e operadores
│   ├── 📁 routes/
│   │   ├── 📄 criptoaritmeticaRoutes.js     # Definição das rotas da criptoaritmética
│   │   └── 📄 router.js                     # Roteador central do Express
│   ├── 📄 index.js                          # Servidor Express (suporte local e exportação)
│   └── 📄 package.json                      # Dependências específicas do backend
├── 📁 frontend/
│   ├── 📁 css/
│   │   └── 📄 style.css                     # Estilos da interface
│   ├── 📁 js/
│   │   └── 📄 script.js                     # Interação do DOM, chamadas fetch e renderização
│   ├── 📁 pages/
│   │   ├── 📄 melhoresIndividuos.html       # Página de exibição dos dados detalhados
│   │   └── 📄 melhoresIndividuos.js         # Leitura dos dados da query string e exibição
│   └── 📄 index.html                        # Interface principal da calculadora
├── 📄 .gitignore                            # Arquivos e diretórios ignorados pelo Git
├── 📄 package.json                          # Gerenciador de dependências e scripts do monorepo
├── 📄 README.md                             # Documentação do projeto
└── 📄 vercel.json                           # Configuração de rotas e rewrites da Vercel
```

## Documentação da API

### Descrição  
API REST desenvolvida em Node.js com Express para processamento do Algoritmo Genético aplicado à criptoaritmética. Recebe os parâmetros do problema e dos operadores genéticos, executa o ciclo evolutivo e retorna a melhor solução encontrada e o histórico por geração.

### Base URL  
- **Desenvolvimento local:** `http://localhost:3000`
- **Produção (Vercel):** `/api` (relativo ao mesmo domínio da aplicação)

### Tecnologias  
✅ Node.js  
✅ Express.js  
✅ CORS  

### Endpoints

| Método | Rota                     | Ação                                       | Body/Params                  | Status   |
|--------|--------------------------|--------------------------------------------|------------------------------|----------|
| `POST` | `/api/criptoaritmetica`  | Executa a resolução via Algoritmo Genético | Objeto JSON com os parâmetros | `200 OK` / `400 Bad Request` |

### Exemplos

**POST /api/criptoaritmetica**  

**Request:**
```json
{
  "primeiraPalavra": "SEND",
  "segundaPalavra": "MORE",
  "palavraResultante": "MONEY",
  "metodoSelecao": "roleta",
  "taxaMutacaoPercent": "5",
  "tipoCrossover": "pmx",
  "taxaCrossoverPercent": "60",
  "metodoReinsercao": "ordenada",
  "tamanhoPopulacao": "100",
  "numMaxGeracoes": "50"
}
```  

**Response (`200 OK`):**
```json
{
  "resultado": {
    "primeiraPalavra": "SEND",
    "segundaPalavra": "MORE",
    "palavraResultante": "MONEY",
    "primeiraPalavraNumero": 9567,
    "segundaPalavraNumero": 1085,
    "palavraResultanteNumero": 10652,
    "cromossomo": {
      "S": 9,
      "E": 5,
      "N": 6,
      "D": 7,
      "M": 1,
      "O": 0,
      "R": 8,
      "Y": 2
    },
    "fitness": 0,
    "melhoresIndividuos": [
      {
        "geracao": 1,
        "cromossomo": { "S": 3, "E": 5, "N": 6, "D": 7, "M": 1, "O": 0, "R": 8, "Y": 2 },
        "fitness": 612
      },
      {
        "geracao": 12,
        "cromossomo": { "S": 9, "E": 5, "N": 6, "D": 7, "M": 1, "O": 0, "R": 8, "Y": 2 },
        "fitness": 0
      }
    ]
  },
  "message": "Algoritmo executado com sucesso!"
}
```

### Erros Comuns

| Código | Mensagem | Causa |
|--------|----------|-------|
| `400`  | *Mensagem descritiva do erro* | Parâmetros inválidos, campos obrigatórios ausentes ou falha na execução do algoritmo. |
| `504`  | Gateway Timeout (Vercel) | População ou número de gerações excessivos ultrapassando o tempo limite de execução Serverless (10s a 15s). |

**Exemplo de Erro `400`:**
```json
{
  "message": "Cannot read properties of undefined (reading 'primeiraPalavra')"
}
```

### 📦 Como Executar o Projeto

#### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado (versão 18 ou superior recomendada).
- [Git](https://git-scm.com/) instalado.

#### Passo a passo

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/otaviozerotwo/calculadora_criptoaritmetica.git
   cd calculadora_criptoaritmetica
   ```

2. **Instalar as dependências:**
   ```bash
   npm install
   ```

3. **Iniciar o Backend:**
   ```bash
   npm start
   ```
   > O servidor iniciará em `http://localhost:3000`.

4. **Executar o Frontend:**
   - Abra o arquivo `frontend/index.html` diretamente no seu navegador, ou utilize uma extensão como o **Live Server** no VS Code.

---

### 📖 Uso

1. Abra a aplicação no navegador.
2. Defina os **Parâmetros do Algoritmo Genético**:
   - **Método de Seleção:** Roleta ou Torneio.
   - **Taxa de Mutação:** 5% ou 10%.
   - **Tipo de Crossover:** PMX ou Cíclico.
   - **Taxa de Crossover:** 60% ou 80%.
   - **Método de Reinserção:** Ordenada ou Elitismo.
   - **Tamanho da População:** Quantidade de indivíduos (padrão: 100).
   - **Número de Gerações:** Limite de iterações (padrão: 50).
3. Preencha as três palavras nos campos correspondentes (exemplo: `SEND`, `MORE` e `MONEY`).
   > *Nota: O total de letras distintas entre as três palavras não pode ultrapassar 10, pois existem apenas 10 dígitos decimais (0 a 9).*
4. Clique no botão **Calcular**.
5. Observe o bloco de **Resultado**:
   - A substituição matemática detalhada.
   - O mapeamento do cromossomo (letra: dígito).
   - O valor do Fitness (0 representa solução exata).
   - Clique no link **"Melhores Indivíduos por Geração"** para inspecionar em formato JSON a evolução da população ao longo do processo.

## Principais aprendizados

- **Modelagem de Problemas Permutacionais:** Compreensão de como mapear um problema clássico de criptoaritmética para a representação cromossômica de um Algoritmo Genético sem permitir dígitos repetidos.
- **Operadores Genéticos Específicos:** Implementação prática e análise comparativa de operadores projetados para representação por permutação, como **PMX (Partially Mapped Crossover)** e **Crossover Cíclico**.
- **Função de Aptidão (Fitness):** Criação de uma função de fitness baseada no erro absoluto `| (Palavra1 + Palavra2) - Resultado |`, onde o objetivo é a minimização até o fitness zero.
- **Arquitetura e Deploy Serverless:** Estruturação de um monorepo com Frontend Vanilla e Backend Express configurados para publicação conjunta na **Vercel** através de Serverless Functions e regras de reescrita (`vercel.json`), sem dores de cabeça com CORS.

---

Por **Otávio Cardoso**