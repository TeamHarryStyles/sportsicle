const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jsonParser = require('body-parser').json();

router
    .get('/', (req, res, next) => {
        User.find()
            .lean()
            .then(users => res.send(users))
            .catch(next);
    });




    
module.exports = router;