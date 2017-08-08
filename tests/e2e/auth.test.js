const db = require('./helpers/db');
const request = require('./helpers/request');
const { assert } = require('chai');

describe('auth', () => {

    before(db.drop('user'));

    const user = {
        email: 'user',
        password: 'abc'
    };

    describe('user management', () => {

        const badRequest = (url, data, code, error) =>
            request
                .post(url)
                .send(data)
                .then(
                    () => {
                        throw new Error('status should not be okay');
                    },
                    res => {
                        assert.equal(res.status, code);
                        assert.equal(res.response.body.error, error);
                    }
                );

        let token = '';

        it.only('signup', () =>
            request
                .post('/api/auth/signup')
                .send(user)
                .then(res => assert.ok(token = res.body.token))
        );

        it('cannot use same email', () =>
            badRequest('/api/auth/signup', user, 401, 'email in use')
        );
        it('signin requires email', () =>
            badRequest('/api/auth/signing', {
                password: 'abc'
            },
            400,
            'email and password must be supplied')
        );
        it('signin requires password', () =>
            badRequest('/api/auth/signing', {
                email: 'abc'
            },
            400,
            'email and password must be supplied')
        );
        it('signin with wrong user', () =>
            badRequest('/api/auth/signing', {
                email: 'bad user',
                password: user.password
            },
            401,
            'Invalid Login')
        );
        it('signin with wrong password', () =>
            badRequest('/api/auth/signing', {
                email: user.email,
                password: 'bad'
            },
            401,
            'Invalid Login')
        );

        it('singin', () =>
            request
                .post('/api/auth/signin')
                .send(user)
                .then(res => assert.ok(res.body.token))
        );
        it('token is invalid', () =>
            request
                .get('/api/auth/verify')
                .set('Authorization', token)
                .then(res => assert.ok(res.body))
        );
    });
    describe.skip('unauthorized', () => {

        it('401 with no token', () => {
            return request
                .get('/api/team')//TODO: specify proper url
                .set('Authorization', 'badtoken')
                .then(
                    () => {
                        throw new Error('status should not be 200');
                    },
                    res => {
                        assert.equal(res.status, 401);
                        assert.equal(res.response.body.error, 'Authorization Failed');
                    }
                );
        });
    });
});