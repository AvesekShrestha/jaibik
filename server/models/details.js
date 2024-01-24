const mongoose = require("mongoose")

const detailSchema = mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true,

    },
    balance: {
        type: Number,
        default: 0
    },
    deposit: {
        type: Number,
        default: 0
    },
    withdraw: {
        type: Number,
        default: 0
    },
    loanProvided: {
        type: Number,
        default: 0
    },
    loanRecevied: {
        type: Number,
        default: 0
    },
    share: {
        type: Number,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const UserDetails = mongoose.model("detail", detailSchema)
module.exports = UserDetails;

