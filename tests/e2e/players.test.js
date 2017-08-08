const request = require('./helpers/request');
const { assert } = require('chai');
require('../../lib/connect');

describe('players REST api', () => {

    let player = null;

    it('GETs all players from the databse', () => {
        return request.get('/api/players')
            .then(res => res.body)
            .then(players => {
                player = players[40];
                assert.ok(players.length > 0);
            });
    });

    it('GETs a player from the API via ID', () => {
        
    })
});

