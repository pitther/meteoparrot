const {listen} = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cheerio = require('cheerio');
const _ = require('lodash');

const {ORIGIN, PORT, CONTENT_PORT} = require('../config.js');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const io = listen(PORT);

io.on('connection', connection);

function connection(socket) {
    console.log(`Client ${socket.id} connected`);
    socket.on('disconnect', () => disconnect(socket));
}

function disconnect(socket) {
    console.log(`Client ${socket.id} disconnected`);
}

app.get(/.*\.html$/, function(req, res) {
    const {url} = req;

    axios.get(ORIGIN + url).then(response => {
        let $ = cheerio.load(response.data);

        const head = $('head').html();

        let center = $('.Bloque728.p20').html();

        if (!center) {
            center = $('.mt5.minoverflow').html();
        }

        if (!center) {
            center = $('.mlistados.mt10').html();
            // center = $('.mt5.minoverflow').html();
        }

        const html = `<html>${head}<body>${center}</body></html>`;

        res.send(html);
    });
});

app.all(/.*/, function(req, res) {
    const {url, method} = req;

    if (_.endsWith(url, '.png')) {
        res.send('');
        return;
    }

    axios({
        url: ORIGIN + url,
        method
    }).then(response => {
        if (response.headers['content-type']) {
            res.header('Content-Type', response.headers['content-type']);
        }

        res.send(response.data);
    });
});

app.listen(CONTENT_PORT, function() {
    console.log('Server running at:', CONTENT_PORT);
});

module.exports = io;
