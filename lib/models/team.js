const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    roster: {
        type:[{
            player: {
                type: Schema.Types.ObjectId,
                ref: 'Player'
                // required: true TODO: Add the required filled
            },
        }],
        default: [],
        validate: [rosterLimit, '{PATH} roster cannot be higher than 12']
    }, 
        
    //TODO: the validate field isn't valid Mongoose like we though it was from our research
    // Find a valid way to verify the necessary player requirements
    score: {
        type: Number,
        default: 0
    }
});
function rosterLimit(val){
    return val.length <= 12;
}

module.exports = mongoose.model('Team', schema);