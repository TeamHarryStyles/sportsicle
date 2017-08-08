const connection = require('mongoose').connection;

const request = require('./request');//eslint-disable-line

module.exports = {
    drop(collection) {
        return connection
            .collections[collection]
            .drop(err => {
                if (err) console.log(err);//eslint-disable-line
                console.log('connection dropped');//eslint-disable-line
            });
    }
};