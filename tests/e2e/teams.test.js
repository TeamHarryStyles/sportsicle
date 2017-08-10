const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');
const Team = require('../../lib/models/team');


describe('Teams REST api', () => {

    before(() => db.drop('users'));
    before(() => db.drop('teams'));

    let team1 = {
        name: 'Fantastic'
    };

    let token = null;
    before(() => db.getToken().then(t => token = t));

    function saveTeam(team) {
        return request
            .post('/api/teams')
            .set('Authorization', token)
            .send(team)
            .then(({ body }) => {
                team._id = body._id;
                team.__v = body.__v;
                return body;
            });
    }

    it.only('saves an team to the db and to active user', () => { //TODO add teamID to active user
        return saveTeam(team1)
            .then(user => {
                return Team.find(user.team).lean();
                
            })
            .then(savedTeam => {
                assert.isOk(savedTeam[0]._id);
                assert.equal(savedTeam[0].name, team1.name);
                assert.equal(savedTeam[0].score, 0);
                team1._id = savedTeam[0]._id;
            });
    });

    it('GETs team if it exists', () => { //TODO this test isn't really necessary, maybe relevant later?
        return request
            .get(`/api/teams/${team1._id}`)
            .set('Authorization', token)
            .then(res => res.body)
            .then(team => {
                assert.ok(team._id);
                assert.equal(team.name, team1.name);
            });
    });

});