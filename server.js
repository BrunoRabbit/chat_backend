const express = require('express');
const cors = require('cors');

const http = require('http');

const app = express();
const server = http.createServer(app);
const routerUser = require('./routes/user_route');
const createWebSocketServer = require('./routes/chat_route');

const config = require('config');
const errorsDefault = require('./errors/errors_message');

app.use(cors());
app.use(express.json());

app.use('/api/user', routerUser);

createWebSocketServer(server);

app.use((req, res, next) => {
  res.status(404).send();
});

server.listen(config.get('api.port'), () => console.log(errorsDefault.isApiWorking));