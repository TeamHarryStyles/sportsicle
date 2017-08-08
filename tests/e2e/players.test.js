const request = require('./helpers/request');
const { assert } = require('chai');
require('../../lib/connect');

describe('players REST api', () => {

    let savedPlayer = null;

    it('GETs all players from the databse', () => {
        return request.get('/api/players')
            .then(res => res.body)
            .then(players => {
                savedPlayer = players[40];
                assert.ok(players.length > 0);
            });
    });

    it('GETs a player from the API via ID', () => {
        return request.get(`/api/players/${savedPlayer._id}`)
            .then(res => res.body)
            .then( player => {
                assert.ok(player.name);
                assert.ok(player.position);
                assert.ok(player._id);
                assert.ok(player.score);
            });
    });
});

