const Router = require('express').Router;
const router = Router();
const Player = require('../models/player');
const superagent = require('superagent');
require('dotenv').config();

const playerUrl = (playerId) => `http://api.sportradar.us/nba-t3/players/${playerId}/profile.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;
router

    .get('/:id', (req, res) => {

        return superagent.get(playerUrl(req.params.id))
            .then((response) => {
                let fullPlayer = response.body;
                return {
                    name: fullPlayer.full_name,
                    position: fullPlayer.position,
                    jersey_number: fullPlayer.jersey_number,
                    nba_team: `${fullPlayer.team.market} ${fullPlayer.team.name}`,
                };
            })
            .then(player => {
                res.send(player);
            });
    })

    .get('/', (req, res) => {
        const query = {};
        if(req.query.position) query.position = req.query.position;
        if(req.query.name) query.name = req.query.name;
        Player.find(query)
            .lean()
            .then(players => {
                res.send(players);
            });
    });



module.exports = router;
