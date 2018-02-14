'use strict';

const io = require('../io');

console.log('Extension Download started');

io.on('connection', connection);

function connection(socket) {
    console.log(`Extension Download became available for client ${socket.id}`);
    socket.on('download', () => download(socket));
}

function download(socket) {
    console.log(`Client ${socket.id} try to download file`);
}
