const connection = require('mongoose').connection;
const request = require('./request');//eslint-disable-line

module.exports = {
    drop(collection) {
        return connection
            .collections[collection]
            .drop()
            .catch(error => {
                if(error.name !== 'MongoError' || error.message !== 'ns not found') throw error;
            });//eslint-disable-line
    },
    getToken(user = {
        email: 'me@you.com',
        password: 'abc'
    })
    {
        return request.post('/api/auth/signup')
            .send(user)
            .then(res => res.body.token);
    }
};