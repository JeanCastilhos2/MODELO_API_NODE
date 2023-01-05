const mongoose = require("mongoose");

import { User } from "./User"

export const List = mongoose.model("List", {
    user_id: {
        type: User.Types.ObjectId,
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

