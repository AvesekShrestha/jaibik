const mongoose = require("mongoose")

const loanSchema = mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Account",
        required: true
    },
    accountNumber: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    },
    interestRate: {
        type: Number,
        require: true
    },
    interestAmount: {
        type: Number,
        default: 0
    },
    totalAmount: {
        type: Number,
        required: true,
        default: 0,
    },

})

const Loan = mongoose.model("loan", loanSchema)

module.exports = Loan;