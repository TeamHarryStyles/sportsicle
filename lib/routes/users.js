const express = require('express');
const router = express.Router();
const User = require('../models/user');

router
    .get('/', (req, res, next) => {
        User.find()
            .select('email team')
            .lean()
            // .select('-__V -__id')
            .then(users => res.send(users))
            .catch(next);
    });




    
module.exports = router;