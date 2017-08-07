const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {
    it('new user generates hash', () =>{
        const user = new User({
            email: 'tsttxt@woo.com'
        });
        const password = 'abc';
        user.generateHash(password);

        assert.notEqual(user.has, password);
        assert.isOk(user.comparePassword('abc'));
        assert.isNotOk(user.comparePassword('bad password'));
    });
    it.skip('validate with all remaining fields', () => {

    })
});// Make validation test after team schema is built
