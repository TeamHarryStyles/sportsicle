
const mongoose = require('mongoose');
mongoose.Promise = Promise;

module.exports = function(dbUri) {
    const promise = mongoose.connect(dbUri).then( () => mongoose.connection );
    mongoose.connect(dbUri);

    mongoose.connection.on('connected', () => {
        ('mongoose default connection open to ' + dbUri );
    });

    mongoose.connection.on('error', (err) => {
        console.log('mongoose default connection error ' + err);//eslint-disable-line
    });

    mongoose.connection.on('disconnected', () => {
        console.log('mongoose default connection disconnected');//eslint-disable-line
    });

    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            console.log('mongoose default connection disconnected through app termination');//eslint-disable-line
            process.exit(0);
        });
    });
    return promise;
};