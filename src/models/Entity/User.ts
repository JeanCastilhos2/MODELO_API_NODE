const mongoose = require("mongoose");

const User = mongoose.model("User", {
    user: { type: String },
    email: { type: String },
    password: { type: String },
    role: { type: String },
    list: [
        {
            id: { type: String },
            note: { type: Number }
        }
    ]

});

module.exports = User;
