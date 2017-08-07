const assert = require('chai').assert;
const User = require('../../lib/models/user');

describe('user model', () => {
    it('new user generates hash', () =>{
        const user = new User({
            email: 'tsttxt@woo.com'
        });
        const password = 'abc';
        user.generateHash(password);

        assert.notEqual(user.hash, password);
        assert.isOk(user.comparePassword('abc'));
        assert.isNotOk(user.comparePassword('bad password'));
    });
    //TODO: finish Unit test on all fields 
    // it.skip('validate with all remaining fields', () => {
    //     const user = new User({
    //         email: 'hello@world.org',
    //         roles: ['User'],
    //         team:
    //     });
    //     const password = 'xyz';

    // });
});// Make validation test after team schema is built
