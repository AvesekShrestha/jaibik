const mongoose = require("mongoose")


const balanceSchema = mongoose.Schema({
    accountHolder: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    accountNumber: {
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    share: {
        type: Number,
        default: 0,
    },
    loan: {
        type: Number,
        default: 0
    },

})


const Balance = mongoose.model("balance", balanceSchema)
module.exports = Balance;
