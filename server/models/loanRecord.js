const mongoose = require("mongoose")

const loanRecordSchema = mongoose.Schema({
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
    },
    date: {
        type: Date,
        default: Date.now
    }

})

const LoanRecord = mongoose.model("loan_record", loanRecordSchema)

module.exports = LoanRecord;