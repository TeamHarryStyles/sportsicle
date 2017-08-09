const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('Users REST api', () => {
    
    before(() => db.drop('users'));

    let pierre = {
        email: 'Golden@st.war',
        password: 'abc'
    };
    let chris = {
        email: 'tsttxt@hello.world',
        password: 'xyz'
    };
    let haley = {
        email: 'harry@styles.com',
        password: '123'
    };
    let joe = {
        email: 'beard4evr@dollarShv.com',
        password: '456'
    };
    let token = null;
    before(() => db.getToken().then(t => token = t));


    function saveUser(user) {
        return request
            .post('/api/auth/signup')
            .set('Authorization', token)
            .send(user)
            .then(({body}) => {
                user._id = body._id;
                user.__v = body.__v;
                return body;
            });
    }
    it('GETs all Users for a league request', () => {
        return Promise.all([
            saveUser(pierre),
            saveUser(chris),
            saveUser(haley),
            saveUser(joe),
        ])
            .then(() => request
                .get('/api/league')
                .set('Authorization', token)
            )
            .then(res => {
                const users = res.body;
                // assert.equal(users[1].email, pierre.email);
                // assert.equal(users[2].email, chris.email);
                // assert.equal(users[3].email, haley.email);
                // assert.equal(users[4].email, joe.email);
                assert.deepEqual(users, [pierre, chris, haley, joe]);
            });
    });

});