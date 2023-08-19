const TableChat = require('./table_chat');

class Chat {
    constructor({ id, text, createdAt, userId, userName, imageUrl, }) {
        this.id = id;
        this.text = text;
        this.createdAt = createdAt;
        this.userId = userId;
        this.userName = userName;
        this.imageUrl = imageUrl;
    }

    async saveMessageDatabase() {
        const result = await TableChat.insert({
            text: this.text,
            createdAt: this.createdAt,
            userId: this.userId,
            userName: this.userName,
            imageUrl: this.imageUrl,
        });
        this.id = result.id;
    }

    static async getMessageDatabase() {
        const messages = await TableChat.loadMessages();
        return messages;
    }
}

module.exports = Chat;