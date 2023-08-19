const WebSocket = require('ws');
const Chat = require('../src/chat/chat');

function createWebSocketServer(server) {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Nova conexão WebSocket');

        const getMessages = async () => {
            const chat = await Chat.getMessageDatabase();
            ws.send(JSON.stringify(chat));
        };

        getMessages();

        ws.on('message', async (message) => {
            const msgData = JSON.parse(message);
            const chatMessage = new Chat(msgData);

            await chatMessage.saveMessageDatabase();

            const messages = await Chat.getMessageDatabase();

            ws.send(JSON.stringify(messages));
        });

        ws.on('close', () => {
            console.log('Conexão WebSocket fechada');
        });
    });
}


module.exports = createWebSocketServer;