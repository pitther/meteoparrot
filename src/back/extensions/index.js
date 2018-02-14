'use strict';

const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);

module.export = fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
    .map(file => require(__dirname + '/' + file));
