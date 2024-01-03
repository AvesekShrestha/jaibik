const mongoose = require("mongoose")

const depositeSchema = mongoose.Schema({
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
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const Deposite = mongoose.model("deposite", depositeSchema)

module.exports = Deposite