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
    return val.length <= 12;
}

schema.static('reportLeague', function() {
    return this.aggregate([
        {
            $lookup: {
                from: 'users',
                localField: '_id',
                foreignField: 'team',
                as: 'user'
            }
        },
        {
            $project: {
                name: 1,
                score: 1,
                email: '$user.email'
            }
        },
        { $unwind: '$email' },
        {
            $sort: {
                score: -1
            }
        }
    ])
})

module.exports = mongoose.model('Team', schema);