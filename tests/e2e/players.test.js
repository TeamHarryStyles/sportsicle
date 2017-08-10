const request = require('./helpers/request');
const { assert } = require('chai');
require('../../lib/connect');

function waitOne(n = 0) {
    return new Promise(resolve => {
        setTimeout(resolve, (n + 1) * 1010);
    });
}

describe.only('players REST api', () => {

    let savedPlayer = null;

    it('GETs all players from the databse', () => {
        return request.get('/api/players')
            .then(res => res.body)
            .then(players => {
                savedPlayer = players[2];
                assert.ok(players.length > 0);
            });
    });

    it('GETs a valid player from the API via ID', () => {
        return request.get(`/api/players/${savedPlayer._id}`)
            .then(res => res.body)
            .then(player => {
                assert.ok(player.name);
                assert.ok(player.position);
            });
    });

    it('returns a selection of players by query parameter', () => {
        return waitOne(1)
            .then(() => {
                return request.get('/api/players?position=G');
            })
            .then((res) => {
                assert.isAtLeast(res.body.length, 10);
                assert.isOk(res.body[2].name);
            });
    }).timeout(4000);
});

