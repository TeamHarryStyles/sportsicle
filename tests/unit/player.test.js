const Player = require('../../lib/models/player');
const { assert } = require('chai');

describe('player', () => {

    it('validates a player with required fields', () => {
        const stephen = new Player({
            name: 'Stephen Curry',
            position: 'guard',
            injured: false,
            score: 42
        });
        return stephen.validate();
    });

    it('fails validation when required fields missing', () => {
        const shaq = new Player();
        return shaq.validate()
            .then(() => {
                throw new Error('expected validation error but didn\'t get any');
            },
            ({ errors }) => {
                assert.ok(errors.name);
                assert.ok(errors.position);
                assert.ok(errors.injured);
                assert.ok(errors.score);
            });

    });
});