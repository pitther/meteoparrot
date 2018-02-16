require('./extensions');

const {sequelize} = require('./models');

sequelize.query('PRAGMA synchronous = OFF; PRAGMA journal_mode = MEMORY;').then(() => {
    sequelize.sync().then(() => {
        setInterval(() => {
            console.log('I\'m alive');
        }, 10000);
    });
});
