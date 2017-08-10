const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    roster: {
        type:[
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
function rosterLimit(val){
    return val.length <= 12;
}

module.exports = mongoose.model('Team', schema);