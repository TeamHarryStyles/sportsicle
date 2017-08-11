const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    position: {
        type: String,
        required: true
    },
    _id: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true,
        default: 0
    }
});

module.exports = mongoose.model('Player', schema);