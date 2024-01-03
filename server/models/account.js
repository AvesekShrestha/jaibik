const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,

    },
    gender: {
        type: String,
        required: true,
    },
    heir: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true,
    },
    citizenshipNumber: {
        type: String,
        required: true
    },
    accountNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    accountType: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
})

const Account = mongoose.model("account", accountSchema)
module.exports = Account;

