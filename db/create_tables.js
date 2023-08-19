const CreateTablesUser = require('../src/auth/model_user');
const CreateTablesChat = require('../src/chat/model_chat');

CreateTablesUser.sync()
  .then(() => console.log('Tabela user criado com sucesso'))
  .catch(console.log);

CreateTablesChat.sync()
  .then(() => console.log('Tabela chat criado com sucesso'))
  .catch(console.log);