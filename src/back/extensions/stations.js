'use strict';

const io = require('../io');
const cvs = require('csv');
const moment = require('moment');

const {Station} = require('../models');

console.log('Extension Stations started');

io.on('connection', connection);

function connection(socket) {
    console.log(`Extension Stations became available for client ${socket.id}`);
    socket.on('stations.get', () => get(socket));
    socket.on('stations.load', ({content}) => load(socket, content));
}

function get(socket) {
    console.log(`Client ${socket.id} want to get station list`);

    Station.findAll({raw: true}).then(data => {
        socket.emit('stations.data', data);
    });
}

function load(socket, content) {
    console.log(`Client ${socket.id} try to load station list from file`);

    cvs.parse(content, {
        columns: true
    }, function(err, data) {
        if (err) {
            socket.emit('stations.load-error');
            return;
        }

        const count = data.length;

        socket.emit('stations.load-started', {count});


        for (let i = 0; i < count; i++) {
            if (i % 100 === 0) {
                socket.emit('stations.load-progress', {current: i, count});
            }

            const rec = data[i];

            const usaf = parseInt(rec['USAF'], 10);
            const wban = parseInt(rec['WBAN'], 10);
            const name = rec['STATION NAME'];
            const country = rec['CTRY'];
            const state = rec['STATE'];
            const icao = rec['ICAO'] === '' ? null : rec['ICAO'];
            const lat = parseFloat(rec['LAT']);
            const lon = parseFloat(rec['LON']);
            const elev = parseFloat(rec['ELEV(M)']);
            const begin = moment(rec['BEGIN']).toDate();
            const end = moment(rec['END']).toDate();

            Station.upsert({
                usaf,
                wban,
                name,
                country,
                state,
                icao,
                lat,
                lon,
                elev,
                begin,
                end
            }, {where: {usaf, wban}}).catch(() => {
                socket.emit('stations.load-error');
            });
        }

        socket.emit('stations.load-finished', {count});
    });
}
