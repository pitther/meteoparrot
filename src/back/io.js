const {listen} = require('socket.io');

const {PORT} = require('../config.js');

const io = listen(PORT);

io.on('connection', connection);

function connection(socket) {
    console.log(`Client ${socket.id} connected`);
    socket.on('disconnect', () => disconnect(socket));
}

function disconnect(socket) {
    console.log(`Client ${socket.id} disconnected`);
}

module.exports = io;
