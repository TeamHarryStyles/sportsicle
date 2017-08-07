const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');//TODO: incorperate brypt into user

const schema = new Schema({
    email:{
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    roles: [String],// TODO: review the roles position. Is it nessary for authientication?
    team: {
        type: Schema.Types.ObjectId,
        ref:'Team',
        // required: true // TODO: make team a required field
    }
});
//DONE: build the static methods for authenication
schema.method('generateHash', function(password) {
    this.hash = bcrypt.hashSync(password, 8);
});

schema.method('comparePassword', function(password) {
    return bcrypt.compareSync(password,this.hash);
});

schema.static('exists', function(query) {
    return this.find(query)
        .count()
        .then(count => (count > 0));
    
});

module.exports = mongoose.model('User', schema);