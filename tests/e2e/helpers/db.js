const connection = require('mongoose').connection;
const request = require('./request');

module.exports = {
    drop(collection) {
        return connection
            .collections[collection]
            .drop(err => {
                if(err) console.log(err);//eslint-disable-line
                console.log('connection dropped');//eslint-disable-line
            })
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