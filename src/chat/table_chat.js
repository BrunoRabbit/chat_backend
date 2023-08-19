const Model = require('./model_chat');
const ErrorGenerator = require('../../errors/errors_generator');
const errorsDefault = require('../../errors/errors_message');

module.exports = {
  async insert(chat) {
    return await Model.create(chat);
  },
  async loadMessages() {
    try {
      const messages = await Model.findAll({
        attributes: ['id', 'text', 'createdAt', 'userId', 'userName', 'imageUrl'],
        order: [['createdAt', 'DESC']],
      });
      return messages;
    } catch (error) {
      throw new ErrorGenerator(400, errorsDefault.userNotFound);
    }
  },
};