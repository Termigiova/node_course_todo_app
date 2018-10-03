let mongoose = require('mongoose');

let User = mongoose.model('Users', {
    email: {
        type: String,
        requireduired: true,
        trim: true,
        minlength: 1
    }
});

module.exports = {User};