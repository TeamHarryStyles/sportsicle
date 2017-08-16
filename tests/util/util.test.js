const utils = require('../../util/update');
const { assert } = require('chai');
const Player = require('../../lib/models/player');

describe('App utility functions', () => {

    describe('util.updatePlayerScore', () => {
        it('updates a player\'s score', () => {
            return utils.updatePlayerScore('345c15a5-afb4-4972-8880-9a889c16f6bb', 32)
                .then(res => {
                    assert.equal(res.score, 32);
                });
        });
    });

    describe('utils.getGameScores', () => {

        it('gets Game Scores when passed a game Id', () => {
            return utils.getGameScores('a7078756-0963-4c68-872c-9b677f786a5e')
                .then(() => Player.find({ score: { $ne: 0 } }).count())
                .then((res) => {
                    assert.isAtLeast(res, 10);
                });
        });

    });

    describe('utils.getDailySchedule', () => {

        it('gets game scores from a date', () => {
            return utils.waitOne(1)
                .then(() => utils.getDailySchedule(['2016', '10', '25']))
                .then(() => Player.find({ score: { $ne: 0 } }).count())
                .then((res) => {
                    assert.isAtLeast(res, 25);
                });
        }).timeout(10000);

    });

    describe('utils.getWeeklyScores', () => {
        it('gets weekly scores from a date and updates player score in the db', () => {
            return utils.waitOne(1)
                .then(() => utils.getWeeklyScores(new Date(2016, 10, 1)))
                .then(() => {
                    require('fs').writeFileSync('scores.json', JSON.stringify(utils.scores));
                })
                .then(() => {
                    return Player.find({ score: { $ne: 0 } }).count()
                        .then(res => {
                            assert.isAtLeast(res, 50);
                        });
                });
        }).timeout(100000);
    });

});