const mongoose = require("mongoose")

const withdrawSchema = mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true,
    },
    accountNumber: {
        type: Number,
        required: true,
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Withdraw = mongoose.model("withdraw", withdrawSchema)

module.exports = Withdraw;