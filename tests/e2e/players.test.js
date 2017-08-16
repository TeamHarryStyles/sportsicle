const request = require('./helpers/request');
const { assert } = require('chai');
const db = require('./helpers/db');
// connection already happens in before-after.js

// should be own helper function. could then be shared with util
function waitOne(n = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, (n + 1) * 1010);
    });
}

describe('players REST api', () => {
    before(() => db.drop('users'));

    let savedPlayer = null;
    let token = null;
    before(() => db.getToken().then(t => token = t));

    // clients outside the server don't know about the database
    it('GETs all players', () => {
        return request.get('/api/players')
            .set('Authorization', token)
            .then(res => res.body)
            .then(players => {
                savedPlayer = players[2];
                assert.ok(players.length > 0);
            });
    });

    it('GETs a valid player from the API via ID', () => {
        return request.get(`/api/players/${savedPlayer._id}`)
            .set('Authorization', token)
            .then(res => res.body)
            .then(player => {
                assert.ok(player.name);
                assert.ok(player.position);
            });
    });

    it('returns a selection of players by query parameter', () => {
        return waitOne(1)
            .then(() => {
                return request.get('/api/players?position=G')
                    .set('Authorization', token);
            })
            .then((res) => {
                assert.isAtLeast(res.body.length, 10);
                assert.isOk(res.body[2].name);
            });
    }).timeout(4000);
});

