const mongoose = require('mongoose');

const User = new mongoose.Schema(
    {
        userid: {
            required: true,
            type: String
        },
        username: {
            required: true,
            type: String
        },
        history: {
            type: [[Number, Number]],  // [week#, total value (in $)]
            default: []
        },
        portfolio: {
            type: [[String, Number]], // [stock name, quantity]
            default: []
        }
    },
    {
        versionKey: false,
    }
);

module.exports = mongoose.model('User', User);

