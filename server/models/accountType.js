const mongoose = require("mongoose")

const accountTypeSchema = mongoose.Schema({
    accountType: {
        type: String,
        required: true,
    },
    interestRate: {
        type: Number,
        required: true
    },
    loanLimit: {
        type: Number,
        required: true,
    },
})

const AccountType = mongoose.model("type", accountTypeSchema)

module.exports = AccountType;


