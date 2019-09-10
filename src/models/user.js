const mongoose = require('mongoose');
require('mongoose-type-email')
const bcrypt = require('bcrypt-nodejs');

const User = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

User.methods.genHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7), null);
}

User.methods.validatePassword = (password, actualPassword, cb) => {
    console.log(this);
    return bcrypt.compare(password, actualPassword, cb)
}

module.exports = mongoose.model('User', User);