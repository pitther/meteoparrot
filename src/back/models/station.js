'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('Station', {
        usaf: {type: DataTypes.INTEGER, allowNull: false},
        wban: {type: DataTypes.INTEGER, allowNull: false},
        name: {type: DataTypes.STRING, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: false},
        state: {type: DataTypes.STRING, allowNull: false},
        icao: {type: DataTypes.STRING, allowNull: true},
        lat: {type: DataTypes.FLOAT, allowNull: false},
        lon: {type: DataTypes.FLOAT, allowNull: false},
        elev: {type: DataTypes.FLOAT, allowNull: false},
        begin: {type: DataTypes.DATEONLY, allowNull: false},
        end: {type: DataTypes.DATEONLY, allowNull: false}
    }, {
        indexes: [
            {fields: ['usaf', 'wban'], unique: true}
        ]
    });
};
