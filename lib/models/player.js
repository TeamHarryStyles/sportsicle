const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String, 
        required: true
    },
    position: {
        type: String,
        enum: ['guard', 'forward', 'center'],
        required: true
    },
    injured: {
        type: Boolean,
        required: true
    },
    score: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Player', schema);