const express = require("express")
const router = express.Router()
const Account = require("../models/account")
const Balance = require("../models/balance")
const Loan = require("../models/loan")
const AccountType = require("../models/accountType")
const LoanRecord = require("../models/loanRecord")
const Deposite = require("../models/deposite")
const Withdraw = require("../models/withdraw")
const LoanRecived = require("../models/loanRecive")
const Share = require("../models/share")


router.post("/", async (req, res) => {
    const { name, age, gender, heir, contact, citizenshipNumber, accountType } = req.body;
    try {

        const lastAccount = await Account.findOne().sort({ accountNumber: -1 });
        const newAccountNumber = lastAccount ? lastAccount.accountNumber + 1 : 1;

        const data = await AccountType.findOne({ accountType })

        if (!data) return res.status(404).json({ message: "That account type not available" })

        const newAccount = new Account({ name, age, gender, heir, contact, citizenshipNumber, accountNumber: newAccountNumber, accountType: data._id, })
        await newAccount.save()

        const newBalance = new Balance({ accountHolder: newAccount._id, accountNumber: newAccount.accountNumber })
        await newBalance.save()

        const type = await AccountType.findOne({ _id: newAccount.accountType })
        const newLoan = new Loan({ accountHolder: newAccount._id, accountNumber: newAccount.accountNumber, interestRate: type.interestRate })
        await newLoan.save()

        return res.status(200).json(newAccount);
    } catch (error) {
        return res.status(500).json({ message: "Error while creating account" })
    }

})

router.post("/findType", async (req, res) => {
    const { accountType } = req.body;

    try {
        const data = await AccountType.findOne({ accountType })
        if (!data) return res.status(404).json({ message: "No account type found" })
        else return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Error occured " })
    }
})

router.get("/balance/:number", async (req, res) => {
    try {
        const accountNumber = req.params.number
        const balance = await Balance.findOne({ accountNumber })
        const account = await Account.findOne({ accountNumber })
        const type = await AccountType.findOne({ _id: account.accountType })

        if (!balance || !account || !type) return res.status(404).json({ message: "Data not found" })
        else return res.status(200).json({ account, balance, type })

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await Account.find({})
        if (!data) return res.status(404).json({ message: "No data found" })
        else return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }

})

router.get("/user", async (req, res) => {
    try {
        const accounts = await Account.find({})
        if (accounts.length === 0) return res.status(404).json({ message: "No data found" })
        return res.status(200).json(accounts)
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

router.get("/user/details/:accountHolder", async (req, res) => {
    try {
        const accountHolder = req.params.accountHolder
        const account = await Account.findOne({ _id: accountHolder })
        const accountType = await AccountType.findOne({ _id: account.accountType })
        const balance = await Balance.findOne({ accountHolder })
        const loan = await Loan.findOne({ accountHolder })
        const loanRecord = await LoanRecord.find({ accountHolder })
        const deposit = await Deposite.find({ accountHolder })
        const withdraw = await Withdraw.find({ accountHolder })
        // const share = await Share.find()
        const loanReceive = await LoanRecived.find({ accountHolder })


        if (!loan && loanRecord) return res.status(404).json({ message: "No loan" })
        if (!deposit) return res.status(200).json({ account, accountType, balance, loan, loanRecord, deposit: [], withdraw, loanReceive })
        if (!withdraw) return res.status(200).json({ account, accountType, balance, loan, loanRecord, deposit, withdraw: [], loanReceive })
        if (!loanReceive) return res.status(200).json({ account, accountType, balance, loan, loanRecord, deposit, withdraw, loanReceive: [] })

        res.status(200).json({ account, accountType, balance, loan, loanRecord, deposit, withdraw, loanReceive })

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

module.exports = router;