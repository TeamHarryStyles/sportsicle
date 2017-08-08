const Router = require('express').Router;
const router = Router();
const Player = require('../models/player');
const superagent = require('superagent');
require('dotenv').config();

router

    .get('/:id', (req, res) => {
        const playerUrl = (playerId) => `http://api.sportradar.us/nba-t3/players/${playerId}/profile.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;

        return superagent.get(playerUrl(req.params.id))
            .then((response) => {
                let fullPlayer = response.body;
                if (fullPlayer.seasons) {
                    let avgStats = fullPlayer.seasons[0].teams[0].average;
                    return {
                        name: fullPlayer.full_name,
                        position: fullPlayer.position,
                        jersey_number: fullPlayer.jersey_number,
                        nba_team: `${fullPlayer.team.market} ${fullPlayer.team.name}`,
                        score: Math.floor(avgStats.points + avgStats.assists + avgStats.rebounds + avgStats.steals)
                    };
                } else {
                    return res.status(404).send('Not Found');
                }
            })
            .then(player => {
                res.send(player);
            })
            .catch(console.log);//eslint-disable-line
    })

    .get('/', (req, res) => {
        Player.find()
            .lean()
            .then(players => {
                res.send(players);
            })
            .catch(console.log);//eslint-disable-line
    });

module.exports = router;
