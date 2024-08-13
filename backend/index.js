const express = require('express');
const cors = require('cors');
const routes = require('./routes/router');

const server = express();
const port = 3000;

server.use(cors());
server.use(express.json());

server.use('/api', routes);

server.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});