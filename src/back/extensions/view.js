'use strict';

const io = require('../io');

console.log('Extension View started');

io.on('connection', connection);

function connection(socket) {
    console.log(`Extension View became available for client ${socket.id}`);
    socket.on('view', () => view(socket));
}

function view(socket) {
    console.log(`Client ${socket.id} try to get data`);
}
