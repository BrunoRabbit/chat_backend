const Model = require('./model_user');
const ErrorGenerator = require('../../errors/errors_generator');
const errorsDefault = require('../../errors/errors_message');

module.exports = {
  insert(user) {
    return Model.create(user);
  },

  async getId(id) {
    const found = await Model.findOne({
      where: {
        id: id,
      },
    });

    if (!found) {
      throw new ErrorGenerator(400, errorsDefault.userNotFound);
    }

    return found;
  },

  async getEmail(email, needToVerify) {
    const found = await Model.findOne({
      where: { email: email },
    });
    if (!found && needToVerify) {
      throw new ErrorGenerator(400, errorsDefault.userNotFound);
    }
    return found;
  },

  update(id, dataToUpdate) {
    return Model.update(dataToUpdate, { where: { id: id } });
  },
  remove(email) {
    return Model.destroy({
      where: { email },
    });
  },
};