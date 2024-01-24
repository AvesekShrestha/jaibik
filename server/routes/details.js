const express = require("express")
const router = express.Router()
const Balance = require("../models/balance")
const Loan = require("../models/loan")
const Deposit = require("../models/deposite")
const Withdraw = require("../models/withdraw")
const Share = require("../models/share")
const UserDetails = require("../models/details")
const Account = require("../models/account")
const axios = require("axios")



router.get("/", (req, res) => {
    res.json({ message: "This is working fine" })

})

router.post("/:accountNumber", async (req, res) => {
    try {

        const accountNumber = req.params.accountNumber
        const { deposit, withdraw, loanProvided, loanReceived, share } = req.body;
        const account = await Account.findOne({ accountNumber })
        const accountHolder = account._id;

        if (deposit != 0) await axios.post("http://localhost:8000/deposit", { accountNumber, amount: deposit })
        if (withdraw != 0) await axios.post(`http://localhost:8000/deposit/withdraw/${accountNumber}`, { amount: withdraw })
        if (loanProvided != 0) await axios.post(`http://localhost:8000/loan/provide`, { accountNumber, amount: loanProvided })
        if (loanReceived != 0) await axios.post(`http://localhost:8000/loan/receive/${accountNumber}`, { amount: loanReceived })

        const balanceModel = await Balance.findOne({ accountHolder })
        const newDetails = new UserDetails({ accountHolder, accountNumber, balance: balanceModel.balance, deposit, withdraw, loanProvided, loanReceived, share })
        await newDetails.save()

        res.status(200).json(newDetails)
    } catch (error) {
        res.status(400).json({ message: "Error occured" })
    }


})

module.exports = router;