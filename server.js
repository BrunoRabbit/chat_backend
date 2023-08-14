const express = require('express');
const cors = require('cors');

const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const routerUser = require('./routes/user_route');

const config = require('config');
const errorsDefault = require('./errors/errors_message');

app.use(cors());
app.use(express.json());

app.use('/api/user', routerUser);

wss.on('connection', (ws) => {
  console.log('Nova conexão WebSocket');

  ws.on('message', (message) => {
    console.log(`Mensagem recebida: ${message}`);
  });

  ws.on('close', () => {
    console.log('Conexão WebSocket fechada');
  });
});

app.use((req, res, next) => {
  res.status(404).send();
});

server.listen(config.get('api.port'), () => console.log(errorsDefault.isApiWorking));