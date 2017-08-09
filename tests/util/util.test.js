const utils = require('../../util/update');
const { assert } = require('chai');


describe('App utility functions', () => {


    describe('utils.getGameScores', () => {

        it('gets Game Scores when passed a game Id', () => {
            return utils.getGameScores('a7078756-0963-4c68-872c-9b677f786a5e')
                .then(() => {
                    assert.ok(Object.keys(utils.scores).length > 10);
                });
        });

    });
});