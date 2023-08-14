const CreateTablesUser = require('../auth/model_user');

CreateTablesUser.sync()
  .then(() => console.log('Tabela user criado com sucesso'))
  .catch(console.log);