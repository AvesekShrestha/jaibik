const mongoose = require("mongoose")

const loanReciveSchema = mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
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
    },
})

const LoanRecived = mongoose.model("loan_recive", loanReciveSchema)
module.exports = LoanRecived;