const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('Teams REST api', () => {
    
    before(() => db.drop('users'));

    let team1 = {
        name: 'Fantastic',
        roster: [{
            player: null //TODO: change to id of player
        }],
        score: 43 
    };

    // let team2 = {
    //     name: 'chris',
    //     roster: [{
    //         player: null
    //     }],
    //     score: 55 
    // };

    // let team3 = {
    //     name: 'haley',
    //     roster: [{
    //         player: null
    //     }],
    //     score: 90 
    // };

    // let team4 = {
    //     name: 'joe',
    //     roster: [{
    //         player: null
    //     }],
    //     score: 67 
    // };
    let token = null;
    before(() => db.getToken().then(t => token = t));

    function saveTeam(team) {
        return request
            .post('/api/teams')
            .set('Authorization', token)
            .send(team)
            .then(({body}) => {
                team._id = body._id;
                team.__v = body.__v;
                return body;
            });
    }

    it.only('saves an team', () => {
        return saveTeam(team1)
            .then(savedTeam => {
                assert.isOk(savedTeam._id);
                assert.equal(savedTeam.name, team1.name);
                assert.equal(savedTeam.score, team1.score); 
                team1._id = savedTeam._id;
            });
    });
    it('GETs team if it exists', () => {
        return request
            .get(`/teams/${team1._id}`)
            .set('Authorization', token)
            .then(res => res.body)
            .then(team => { 
                assert.ok(team._id);
                assert.equal(team.name, team1.name);

            });
    });   
});