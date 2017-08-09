const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
//    name: {
//     type: String, 
//     required: true
// }
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

schema.method('updateRanking', function (add) {
    return
        
});

module.exports = mongoose.model('League', schema);