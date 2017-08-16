const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    roster: {
        type: [
            {
                type: String,
                ref: 'Player'
            }
        ],
        default: [],
        validate: [rosterLimit, '{PATH} roster cannot be higher than 12']
    },
    score: {
        type: Number,
        default: 0
    }
});

function rosterLimit(val) {
    return val && val.length <= 12;
}

// one option for separating out aggregate steps.
// this query was pretty manageable inside the
// primary function, so tradeoff
// may be that harder to read
const lookupUser = {
    $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: 'team',
        as: 'user'
    }
};

const projectWithEmail = {
    $project: {
        name: 1,
        score: 1,
        email: '$user.email'
    }
};

const flattenEmail = { $unwind: '$email' };

const sortByHighestScore = {
    $sort: {
        score: -1
    }
};

schema.static('reportLeague', function() {
    return this.aggregate([
        lookupUser,
        projectWithEmail,
        flattenEmail,
        sortByHighestScore
    ])
})

module.exports = mongoose.model('Team', schema);