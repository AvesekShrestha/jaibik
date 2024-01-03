const express = require("express")
const router = express.Router()
const AccountType = require("../models/accountType")

router.post("/create", async (req, res) => {
    const { accountType, interestRate, loanLimit } = req.body;
    try {
        const newAccountType = new AccountType({ accountType, interestRate, loanLimit })
        await newAccountType.save()
        return res.status(200).json(newAccountType)

    } catch (error) {
        return res.status(500).json({ message: "Error occured while creating account type" })
    }
})

router.get("/", async (req, res) => {
    try {
        const data = await AccountType.find({})
        if (!data) return res.status(404).json({ message: "No account type found" })
        else return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

module.exports = router;