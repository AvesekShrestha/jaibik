const express = require("express")
const router = express.Router()
const Deposite = require("../models/deposite")
const Account = require("../models/account")
const Balance = require("../models/balance")
const Withdraw = require("../models/withdraw")


router.post("/", async (req, res) => {
    const { accountNumber, amount } = req.body;
    try {
        const account = await Account.findOne({ accountNumber })
        const accountHolder = account._id;

        const newDeposite = new Deposite({ accountHolder, accountNumber, amount })
        await newDeposite.save()

        await Balance.findOneAndUpdate(
            { accountHolder },
            { $inc: { balance: amount } },

            { new: true }
        )

        return res.status(200).json(newDeposite);
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }

})

router.post("/withdraw/:number", async (req, res) => {
    try {
        const { amount } = req.body;
        const accountNumber = req.params.number;
        const account = await Balance.findOne({ accountNumber })

        if (!account) return res.status(404).json({ message: "Account not found" })
        if (amount > account.balance) return res.status(400).json({ message: "Donot have sufficient balance" })

        const updatedBalance = await Balance.findOneAndUpdate(
            { accountNumber },
            { $inc: { balance: -amount } },
            { new: true }
        )

        const newWithdraw = new Withdraw({ accountHolder: account.accountHolder, accountNumber, amount })
        await newWithdraw.save()

        return res.status(200).json(updatedBalance)
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }

})

router.get("/withdraw/:number", async (req, res) => {
    try {
        const accountNumber = req.params.number;

        const data = await Withdraw.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "NO withdraw records" })
        else return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

router.get("/:number", async (req, res) => {
    const accountNumber = req.params.number;
    try {
        const data = await Deposite.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "No deposite till now" })
        else return res.status(200).json(data)

    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

module.exports = router