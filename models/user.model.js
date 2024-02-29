const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide username']
    },
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    this.password = hashedPassword;
    next();
});

UserSchema.methods.createToken = function() {
    return jwt.sign({ _id: this._id, nickname: this.nickname }, process.env.JWT_SECRET, {
        expiresIn: process.env.TOKEN_LIFETIME,
    });
}

UserSchema.methods.comparePassword = async function(credentialPassword) {
    const compare = await bcrypt.compare(credentialPassword, this.password);
    return compare;
}

module.exports = mongoose.model('user', UserSchema);