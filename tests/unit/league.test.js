const { assert } = require('chai');
const League = require('../../lib/models/league');
const User = require('../../lib/models/user');
const tokenService = require('../../lib/auth/token-service');

describe('league model', () => {
    it('validates with required fields', () => {
        const user1 = new User({
            email: 'tsttxt@woo.com',
            password: 'abc',


        });
        const password = 'abc';
        user1.generateHash(password);
    });
});

