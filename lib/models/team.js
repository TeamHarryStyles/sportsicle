const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    roster: [{
        player: {
            type: Schema.Types.ObjectId,
            ref: 'Player',
            required: true
        },
    }],
    validate: [rosterLimit, '{PATH} roster cannot be lower than 5 or hight than 12'],
    required: true,
    score: {
        type: Number,
        default: 0
    }
});
function rosterLimit(val){
    return val.length <= 12 || val.length >= 5;
}

module.exports = mongoose.model('Team', schema);