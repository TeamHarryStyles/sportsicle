const Team = require('../../lib/models/team');
const { assert } = require('chai');

describe('team', () => {

    it('validates a team with required fields', () => {
        const boxers = new Team({
            name: 'Boxers'
        });
        return boxers.validate();
    });

    it('fails validation when required fields missing', () => {
        const shaq = new Team();
        return shaq.validate()
            .then(() => {
                throw new Error('expected validation error but didn\'t get any');
            },
            ({ errors }) => {
                assert.ok(errors.name);
            });

    });

    it('fails validation when roster size is exceeded', () => {
        const shoeguys = new Team({
            name: 'shoeguys',
            roster: [
                {player: null},
                {player1: null},
                {player2: null},
                {player3: null},
                {player4: null},
                {player5: null},
                {player6: null},
                {player7: null},
                {player8: null},
                {player9: null},
                {player10: null},
                {player11: null},
                {player12: null},
            ]
        });
        return shoeguys.validate()
            .then(() => {
                throw new Error('expected validation error but did not get one');
            },
            ({ errors }) => {
                assert.ok(errors.roster);
            });
    });

});