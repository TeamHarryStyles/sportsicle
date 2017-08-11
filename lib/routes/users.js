const express = require('express');
const router = express.Router();
const Team = require('../models/team');

router
    .get('/', (req, res, next) => {
        Team.reportLeague()
            .then(users => res.send(users))
            .catch(next);
    });




    
module.exports = router;