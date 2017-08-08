const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');
require('../../lib/connect');

describe('players REST api', () => {

    it('GETs all players from the databse', () => {
        return request.get('/api/players')
            .then(res => res.body)
            .then(players => {
                assert.ok(players.length > 0);
            });
    });
});