const utils = require('../../util/update');
const { assert } = require('chai');
const Player = require('../../lib/models/player');




describe.skip('App utility functions', () => {


    describe('utils.getGameScores', () => {

        it('gets Game Scores when passed a game Id', () => {
            return utils.getGameScores('a7078756-0963-4c68-872c-9b677f786a5e')
                .then(() => {
                    assert.ok(Object.keys(utils.scores).length >= 10);
                });
        });

    });

    

    describe('utils.getDailySchedule', () => {

        it('gets game scores from a date', () => {
            return utils.waitOne(1)
                .then(() => utils.getDailySchedule(['2016', '10', '25']))
                .then(() => {
                    assert.ok(Object.keys(utils.scores).length >= 30);
                });
        }).timeout(10000);

    });

    describe('utils.getWeeklyScores', () => {
        it('gets weekly scores from a date', () => {
            return utils.waitOne(1)
                .then( () => utils.getWeeklyScores(new Date(2016, 10, 1)))
                .then(() => {
                    assert.isAtLeast(Object.keys(utils.scores).length, 50);
                    require('fs').writeFileSync('scores.json', JSON.stringify(utils.scores));
                });
        }).timeout(100000);

        it('updates player weekly score', () => {
            return Player.find({score: {$ne: 0}}).count()
                .then(res => {
                    assert.isAtLeast(res, 50);
                });
        });
    });

});