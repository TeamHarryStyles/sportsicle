const Router = require('express').Router;
const router = Router();
const Player = require('../models/player');

router
    .get('/', (req, res) => {
        Player.find()
            .lean()
            .then(players => {
                console.log(players);
                res.send(players);
            })
            .catch(console.log);//eslint-disable-line
    });

module.exports = router;
