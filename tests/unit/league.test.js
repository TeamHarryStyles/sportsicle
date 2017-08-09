const { assert } = require('chai');
const League = require('../../lib/models/league');
const User = require('../../lib/models/user');
const tokenService = require('../../lib/auth/token-service');

describe('league model', () => {
    it.only('validates with required fields', () => {
        const league = new League({
            users: [{
                user: new User(),
                score: new User()
            }]
        });
        return league.validate();
    });
});

