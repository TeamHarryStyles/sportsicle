const Router = require('express').Router;
const router = Router();
const Player = require('../models/player');
const request = require('superagent');
require('dotenv').config();

const playerUrl = (playerId) => `http://api.sportradar.us/nba-t3/players/${playerId}/profile.json?api_key=${process.env.SPORTRADAR_API_TOKEN}`;

// an example of using middleware...
// debatable if needed in this situation, 
// but good to know how to do
function makePlayerQuery(req, res, next) {
    const query = req.playerQuery = {};
    const { position, name } = req.query;
    if(position) query.position = position;
    if(name) query.name = name;
    next();
}

router
    .get('/:id', (req, res, next) => {
        // no-one is listening for return from express route handler :D
        request.get(playerUrl(req.params.id))
            .then(({ body }) => {
                const { full_name, position, jersey_number, team } = body;
                return {
                    name: full_name,
                    position: position,
                    jersey_number: jersey_number,
                    nba_team: `${team.market} ${team.name}`,
                };
            })
            .then(player => {
                res.send(player);
            })
            .catch(next);
    })

    .get('/', makePlayerQuery, (req, res, next) => {
        Player.find(req.playerQuery)
            .lean()
            .then(players => {
                res.send(players);
            })
            .catch(next);
    });



module.exports = router;
