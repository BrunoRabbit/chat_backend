const errorsDefault = require('../../errors/errors_message');
const ErrorGenerator = require('../../errors/errors_generator');
const TableUser = require('./table_user');
const moment = require('moment');

class User {
    constructor({ id, name, password, photo, email }) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.photo = photo;
    }

    async create() {
        this.validateFields();

        if (this.email) {
            const findUserByEmail = await TableUser.getEmail(this.email, false);

            if (findUserByEmail && findUserByEmail.email === this.email) {
                throw new ErrorGenerator(400, errorsDefault.emailUsed);
            }
        }
        
        const result = await TableUser.insert({
            name: this.name,
            email: this.email,
            password: this.password,
            photo: this.photo,
        });

        this.id = result.id;
    }

    async findStoredTokenByID() {
        const foundUser = await TableUser.getId(this.id);
        this.name = foundUser.name;
        this.email = foundUser.email;
        this.password = foundUser.password;
        this.photo = foundUser.photo;
        this.id = foundUser.id;
        return { token: foundUser.token, lastLogin: foundUser.lastLogin, };
    }

    async load() {
        const foundUser = await TableUser.getEmail(this.email, true);
        this.name = foundUser.name;
        this.email = foundUser.email;
        this.password = foundUser.password;
        this.photo = foundUser.photo;
        this.id = foundUser.id;
    }

    async update() {
        const user = await TableUser.getId(this.id);

        if (this.email) {
            const findUserByEmail = await TableUser.getEmail(this.email, false);

            if (findUserByEmail && findUserByEmail.id !== this.id) {
                throw new ErrorGenerator(400, errorsDefault.emailUsed);
            }
        }

        const updatableAttributes = ['name', 'password', 'photo', 'email'];
        const dataToUpdate = {};

        for (const attribute of updatableAttributes) {
            const value = this[attribute];

            if (value !== undefined) {
                if (!value) {
                    dataToUpdate[attribute] = user[attribute];
                } else {
                    dataToUpdate[attribute] = value;
                }
            }
        }
        console.log(dataToUpdate);
        if (!Object.keys(dataToUpdate).length) {
            throw new ErrorGenerator(400, errorsDefault.dataToUpdateNotRecived);
        }

        await TableUser.update(this.id, dataToUpdate);
    }

    remove() {
        return TableUser.remove(this.email);
    }

    validateFields() {
        const fields = ['name', 'password', 'email'];

        fields.forEach((field) => {
            const value = this[field];

            if (!value) {
                throw new ErrorGenerator(
                    400, `${errorsDefault.invalidField}'${field}'`,
                );
            }
        });
    }
    async saveToken(token) {
        const lastLogin = moment.tz('America/Costa_Rica').format("YYYY-MM-DD HH:mm:ss");
        await TableUser.update(this.id, { token, lastLogin });
    }
    async updateToken(token) {
        await TableUser.update(this.id, { token });
    }
}

module.exports = User;