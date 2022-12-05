const mongoose = require("mongoose");

export const User = mongoose.model("User", {
    name: { type: String },
    email: { type: String },
    password: { type: String },
    type: { type: String },
    flag: { type: String },

});

