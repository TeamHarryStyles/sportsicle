const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');
const Team = require('../../lib/models/team');

describe('Users REST api', () => {
    
    before(() => db.drop('users'));
    before(() => db.drop('teams'));

    let pierre = {
        email: 'Golden@st.war',
        password: 'abc',
        
    };
    let chris = {
        email: 'tsttxt@hello.world',
        password: 'xyz',
        
    };
    let haley = {
        email: 'harry@styles.com',
        password: '123',
        
    };
    let joe = {
        email: 'beard4evr@dollarShv.com',
        password: '456',
    };
    let daTeam = {
        name:'Great Team',
        roster: [],
        score: 25
    };
    let daOdaTeam = {
        name:'bad team'
    };
    let goodToken = null;
    before(() => {
        return Promise.all([
            saveUserAndTeam(pierre, daTeam),
            saveUserAndTeam(chris, daOdaTeam),
            saveUserAndTeam(haley, daOdaTeam),
            saveUserAndTeam(joe, daOdaTeam),
        ]);
            
    });

    function saveUserAndTeam(user, team) {
        return request
            .post('/api/auth/signup')
            .send(user)
            .then(({body}) => body.token)
            .then(token => {
                goodToken = token;
                return request
                    .post('/api/teams')
                    .set('Authorization',token)
                    .send(team);
            })
            .then(({ body }) => {
                team._id = body._id;
                team.__v = body.__v;
                return body;
            });
    }
    it.only('GETs all Users for a league request', () => {
        return request
            .get('/api/league')
            .set('Authorization', goodToken)
            .then(res => {
                const users = res.body;
                [pierre, chris, haley, joe].forEach(saved => {
                    const found = users.find(user => user.email === saved.email);
                    assert.ok(found);
                });
                assert.equal(users[0].team.score,25);
                assert.isAbove(users[0].team.score,users[1].team.score);

            });
    });

});