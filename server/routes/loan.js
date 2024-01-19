const express = require("express")
const router = express.Router()
const Loan = require("../models/loan")
const Account = require("../models/account")
const AccountType = require("../models/accountType")
const LoanRecord = require("../models/loanRecord")
const Balance = require("../models/balance")
const LoanRecived = require("../models/loanRecive")
const cron = require("node-cron")


router.post("/provide", async (req, res) => {
    try {
        const { accountNumber, amount } = req.body;
        const account = await Account.findOne({ accountNumber })
        const data = await AccountType.findOne({ _id: account.accountType })
        const accountHolder = account._id;
        const loan = await Loan.findOne({ accountNumber })
        if (loan && amount > (data.loanLimit - loan.amount)) return res.status(400).json({ message: "Amount makes limit exceeds" })
        if (!account) return res.status(404).json({ message: "Account not found" })

        if (loan && loan.amount < data.loanLimit) {

            const newLoanRecord = new LoanRecord({ accountHolder, accountNumber: account.accountNumber, amount })
            await newLoanRecord.save()

            const updatedLoan = await Loan.findOneAndUpdate(
                { accountHolder },
                {
                    $inc: {
                        amount: amount,
                        totalAmount: amount + loan.interestAmount,
                    },
                },
                { new: true }
            )

            await Balance.findOneAndUpdate(
                { accountHolder },
                { $inc: { loan: amount } },
                { new: true }
            )
            return res.status(200).json(updatedLoan)
        }

        if (!loan) {
            if (amount > data.loanLimit) return res.status(400).json({ message: "Amount is higher than loan limit" })
            const newLoan = new Loan({ accountHolder, accountNumber: account.accountNumber, amount, interestRate: data.interestRate, totalAmount: amount })
            await newLoan.save()

            const newLoanRecord = new LoanRecord({ accountHolder, accountNumber: account.accountNumber, amount })
            await newLoanRecord.save()

            await Balance.findOneAndUpdate(
                { accountHolder },
                { $inc: { loan: amount } },
                { new: true }
            )

            return res.status(200).json(newLoan)

        }

    } catch (error) { return res.status(500).json({ message: "Error occured  while providing loan" }) }

})

router.post("/receive/:number", async (req, res) => {

    const accountNumber = req.params.number
    const { amount } = req.body

    try {
        const account = await Balance.findOne({ accountNumber })
        if (amount > account.loan) return res.status(400).json({ message: "Amount greater than loan" })

        const updatedBalance = await Balance.findOneAndUpdate(
            { accountNumber },
            { $inc: { loan: -amount } },
            { new: true }
        )

        await Loan.findOneAndUpdate(
            { accountNumber },
            { $inc: { amount: -amount, totalAmount: -amount } },
            { new: true }
        )

        const newLoanRecive = new LoanRecived({ accountHolder: account.accountHolder, accountNumber, amount })
        await newLoanRecive.save()

        return res.status(200).json(updatedBalance)

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }

})

router.get("/record/:number", async (req, res) => {
    try {
        const accountNumber = req.params.number;
        const data = await LoanRecord.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "No loan records found" })
        else return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ message: "Error while making get request to recive loan records" })
    }
})

router.get("/summary/:number", async (req, res) => {
    const accountNumber = req.params.number;
    try {
        const data = await Loan.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "No loan taken" })
        else return res.status(200).json(data)

    } catch (error) { return res.status(500).json({ message: "Error" }) }

})

router.get("/recive/record/:number", async (req, res) => {
    try {
        const accountNumber = req.params.number
        const data = await LoanRecived.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "No data found" })
        else return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

cron.schedule("1 * * * *", async () => {
    try {
        const loans = await Loan.find({})
        if (loans.length === 0) {
            console.log("No loans")
            return;
        }
        for (const loan of loans) {

            const monthlyInterest = ((loan.interestRate / 100) * loan.totalAmount) / 6;

            loan.interestAmount += monthlyInterest;
            loan.totalAmount += loan.interestAmount;
            await loan.save()

            const balance = await Balance.findOne({ accountNumber: loan.accountNumber })
            balance.loan = loan.totalAmount;
            await balance.save()
        }

    } catch (error) {
        console.log("Error occured")
    }
})

module.exports = router