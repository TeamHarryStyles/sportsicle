const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('Users REST api', () => {
    
    before(() => db.drop('users'));

    let pierre = {
        email: 'Golden@st.war',
        password: 'abc',
        team: {
            name:'GSW',
            score: 44
        }
    };
    let chris = {
        email: 'tsttxt@hello.world',
        password: 'xyz',
        team: {
            name:'the Heeat',
            score: 43
        }
    };
    let haley = {
        email: 'harry@styles.com',
        password: '123',
        team: {
            name:'Dream Blazers',
            score: 45
        }
    };
    let joe = {
        email: 'beard4evr@dollarShv.com',
        password: '456',
    };
    let daTeam ={
        name:'Great Team',
        score: 25
    };
    let token = null;
    before(() => db.getToken().then(t => token = t));


    function saveUser(user,team) {
        return request
            .post('/api/auth/signup')
            .set('Authorization', token)
            .send(user)
            .then(({body}) => {
                user._id = body._id;
                user.__v = body.__v;
                return body;
            })
            .post('/api/team')
            .set('Autorization', token)
            .send(team)
            .then(({body}) => {
                team._id = body._id;
                team.__v = body.__v;
                return body;
            });
        //TODO: finish saveing teams seprately!!!
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

                //TODO: fix random saveing breaking test sometimes 
                //If this test fails run again for new result
                [pierre, chris, haley, joe].forEach(saved => {
                    const found = users.find(user => user.email === saved.email);
                    const teamFound = users.find(user => user.team === saved.team);
                    assert.ok(found);
                    assert.ok(teamFound);
                });
                // assert.equal(users[2].email, chris.email);
                // assert.equal(users[3].email, haley.email);
                // assert.equal(users[4].email, joe.email);
            });
    });

});