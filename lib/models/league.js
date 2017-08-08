const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    userTeam: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }, 
    rank: {
        type: Number,
        required: true
    }
});

// schema.static('')

module.exports = mongoose.model('League', schema);