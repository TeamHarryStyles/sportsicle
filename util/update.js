require('dotenv').config();
const request = require('superagent');
const fs = require('fs');
const mongoose = require('mongoose');
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

    getGameScores(gameId) {
        return request.get(utils.gameUrl(gameId))
            .then(res => {
                res.body.home.players.forEach(player => {
                    let ps = player.statistics;
                    if (utils.scores[player.id]) {
                        utils.scores[player.id].push(ps.points + ps.steals + ps.rebounds + ps.assists);
                    } else {
                        utils.scores[player.id] = [ps.points + ps.steals + ps.rebounds + ps.assists];
                    }
                });
                res.body.away.players.forEach(player => {
                    let ps = player.statistics;
                    if (utils.scores[player.id]) {
                        utils.scores[player.id].push(ps.points + ps.steals + ps.rebounds + ps.assists);
                    } else {
                        utils.scores[player.id] = [ps.points + ps.steals + ps.rebounds + ps.assists];
                    }
                });
            });
    },

    getDailySchedule([y, m, d]) {
        return utils.waitOne()
            .then(() => request.get(utils.scheduleUrl(y, m, d)))
            .then(res => {
                return Promise.all(res.body.games.map((game, i) => {
                    return utils.waitOne(i)
                        .then(() => utils.getGameScores(game.id));
                }));
            });
    },

    getWeeklyScores(date) {
        Player.update({}, { $set: { score: 0 } }, { multi: true });
        let days = [];
        for (let i = 0; i < 7; i++) {
            let d = date;
            days.push(d.toISOString().split('T')[0].split('-'));
            d.setDate(d.getDate() - 1);
        }
        return utils.getDailySchedule(days[0])
            .then(() => utils.getDailySchedule(days[1]))
            .then(() => utils.getDailySchedule(days[2]))
            .then(() => utils.getDailySchedule(days[3]))
            .then(() => utils.getDailySchedule(days[4]))
            .then(() => utils.getDailySchedule(days[5]))
            .then(() => utils.getDailySchedule(days[6]));
    }
};

module.exports = utils;

