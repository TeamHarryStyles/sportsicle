const express = require('express');
const router = express.Router();
const Team = require('../models/team');
const jsonParser = require('body-parser').json();
const User = require('../models/user');

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
        User.findOne(req.user._id)
            .lean()
            .then(user => {
                Team.findOneAndUpdate({
                    _id: user.team
                }, {
                    $addToSet: {
                        roster: req.body._id
                    }
                }, {
                    new: true,
                    runValidators: true
                })
                    .lean()
                    .then(user => {
                        res.send(user);
                    })
                    .catch(next);
            });
    })
    .delete('/roster/:id', (req, res, next) => {
        User.findOne(req.user._id)
            .then(user => {
                Team.findOneAndUpdate({
                    _id: user.team
                }, {
                    $pull: {
                        roster: req.params.id
                    }
                }, {
                    new: true
                })
                    .lean()
                    .then(user => {
                        res.send(user);
                    })
                    .catch(next);
            });
     
        
    })
    .delete('/roster', (req, res, next) => {
        User.findOne(req.user._id)
            .then(user => {
                Team.findOneAndUpdate({
                    _id: user.team
                }, {
                    $set: {
                        roster: []
                    }
                },{ new: true})
                    .then(user => {
                        res.send(user);
                    })
                    .catch(next);
            });
    });

module.exports = router;    
