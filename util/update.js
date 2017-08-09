require('dotenv').config();
const request = require('superagent');
const fs = require('fs');
const mongoose = require('mongoose');


let utils = {
    waitOne(n) {
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

    getDailySchedule(y, m, d) {
        return request.get(utils.scheduleUrl(y, m, d))
            .then(res => {
                return res.body.games.forEach((game, i) => {
                    return utils.waitOne(i)
                        .then(() => utils.getGameScores(game.id));
                });
            });
    },

    getWeeklyScores(date) {
        let days = [];
        for (let i = 0; i < 7; i++) {
            let d = date;
            days.push(d.toISOString().split('T')[0].split('-'));
            d.setDate(d.getDate() - 1);
        }
        return days.forEach((day) => {
            return utils.getDailySchedule(day[0], day[1], day[2]);
        });
    }
};

module.exports = utils;

