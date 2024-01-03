const mongoose = require("mongoose")

const shareSchema = mongoose.Schema({
    accountHolder : {
        type : mongoose.Schema.Types.ObjectId,
        ref :  "Account",
        required : true
    },
    accountNumber : {
        type  : Number,
        required : true,
    },
    currentPrice : {
        type : Number,
        required : true,
        default : 100
    },
    unit :  {
        type : Number,
        required : true,
    },
    totalAmount : {
        type : Number,
        required : true,
        default : 0
    },
    date : {
        type : Date,
        default : Date.now
    }

})

const Share = mongoose.model("share" , shareSchema)
module.exports = Share