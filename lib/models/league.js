const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// no tests for this model :(

const schema = new Schema({
    users: [{
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true
        },
        score: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    }], 
});

module.exports = mongoose.model('League', schema);