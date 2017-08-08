const request = require('./helpers/request');
const { assert } = require('chai');
require('../../lib/connect');

function waitOne() {
    return new Promise(resolve => {
        setTimeout(resolve, 1010);
    });
}

describe('players REST api', () => {

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
                assert.ok(player.score);
            });
    });

    it('returns an error if a player is not valid', () => {
        return waitOne()
            .then(() => {
                return request.get('/api/players/e35d5549-8eae-4f30-824a-357b204dcfb0');
            })
            .then(() => {
                throw new Error('successful status code not expected');
            },
            err => {
                assert.equal(err.status, 404);
                assert.equal(err.message, 'Not Found');
            });
    });
});

