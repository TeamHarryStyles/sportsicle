const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const jsonParser = require('body-parser').json();
const User = require('../models/user');
const Player = require('../models/player');

router
    .use(jsonParser)

    .get('/:id', (req, res, next) => {
        Team.findById(req.params.id)
            .lean()
            .then(team => {
                if (!team) res.status(404).send(`Cannot GET ${req.params.id}`);
                else res.send(team);
            })
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Team.find()
            .lean()
            .select('-__V')
            .then(teams => res.send(teams))
            .catch(next);
    })

    .post('/', (req, res, next) => {
        const team = new Team(req.body);
        team
            .save()
            .then(team => {
                return User.findByIdAndUpdate(req.user.id, { team: team._id }, { new: true });
            })
            .then(user => res.send(user))
            .catch(next);
    })
    .patch('/roster', (req, res, next) => {
        let teamId;
        User.findOne(req.user._id)
            .lean()
            .then(user => {
                teamId = user.team;
                return Team.findOneAndUpdate({
                    _id: teamId
                }, {
                    $addToSet: {
                        roster: req.body._id
                    }
                }, {
                    new: true,
                    runValidators: true
                });
            })
            .then(team => {
                return Promise.all(team.roster.map(playerId => {
                    return Player.findOne({ _id: playerId});
                }));
            })
            .then(playersArray => {
                return playersArray.reduce((accumulator, currentPlayer) => {
                    return accumulator + currentPlayer.score;
                }, 0);
            })
            .then(newScore => {
                return Team.findOneAndUpdate({
                    _id: teamId
                }, {
                    $set: {
                        score: newScore
                    }
                }, {
                    new: true,
                    runValidators: true
                });
            })
            .then(team => {
                res.send(team);
            })
            .catch(next);
    });

module.exports = router;    
