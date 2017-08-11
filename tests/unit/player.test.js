const Player = require('../../lib/models/player');
const { assert } = require('chai');

describe('player', () => {

    it('validates a player with required fields', () => {
        const stephen = new Player({
            name: 'Stephen Curry',
            position: 'G',
            _id: '2813308004jh',
            score: 0
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
                assert.ok(errors._id);
                assert.ok(errors.score);
            });

    });
});