require('dotenv').config();
const request = require('superagent');
const Player = require('../lib/models/player');

let utils = {
    waitOne(n = 0) {
        return new Promise(resolve => {
            setTimeout(resolve, (n + 1) * 1100);
        });
    },

    scheduleUrl(year, month, day) {
        return `http://api.sportradar.us/nba-t3/games/${year}/${month}/${day}/schedule.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;
    },

    gameUrl(gameId) {
        return `http://api.sportradar.us/nba-t3/games/${gameId}/summary.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;
    },

    scores: {},

    updatePlayerScore(id, newScore) {
        return Player.findOneAndUpdate(
            { _id: id },
            { $inc: { score: newScore } },
            { new: true }
        );
    },

    getGameScores(gameId) {
        return request.get(utils.gameUrl(gameId))
            .then(({ body }) => {
                const { home, away } = body;
                const players = home.players.concat(away.players);
                return Promise.all(
                    players.map(({ id, statistics }) => {
                        const { points, steals, rebounds, assists } = statistics;
                        const score = points + steals + rebounds + assists;
                        return utils.updatePlayerScore(id, score);
                    }));
            });
    },

    getDailySchedule([y, m, d]) {
        return utils.waitOne()
            .then(() => request.get(utils.scheduleUrl(y, m, d)))
            .then(({ body }) => {
                return Promise.all(body.games.map((game, i) => {
                    return utils.waitOne(i)
                        .then(() => utils.getGameScores(game.id));
                }));
            });
    },

    getWeeklyScores(date) {
        let days = getDays(date);

        return Player.update({}, { $set: { score: 0 } }, { multi: true })
            .then(() => {
                return utils.getDailySchedule(days[0])
                    .then(() => utils.getDailySchedule(days[1]))
                    .then(() => utils.getDailySchedule(days[2]))
                    .then(() => utils.getDailySchedule(days[3]))
                    .then(() => utils.getDailySchedule(days[4]))
                    .then(() => utils.getDailySchedule(days[5]))
                    .then(() => utils.getDailySchedule(days[6]));
            });
    }
};

// extract function. cleans up main code 
// and makes it easy to unit test this functionality
function getDays(date) {
    let days = [];
    for (let i = 0; i < 7; i++) {
        days.push(date.toISOString().split('T')[0].split('-'));
        date.setDate(date.getDate() - 1);
    }
    return days;
}

module.exports = utils;

