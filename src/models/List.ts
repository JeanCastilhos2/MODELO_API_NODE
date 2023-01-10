const mongoose = require("mongoose");

const User = require('./User');

export const List = new mongoose.model("List",{
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'user_id'
    },
    title_id: {
        type: String
    },
    title_type: {
        type: String
    },
    rate: {
        type: Number
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});








