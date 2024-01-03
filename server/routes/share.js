const express = require("express")
const router = express.Router()
const Share = require("../models/share")
const Balance = require("../models/balance")

router.post("/buy", async (req, res) => {
    try {
        const { accountNumber, currentPrice, unit } = req.body;
        const account = await Balance.findOne({ accountNumber })

        const totalAmount = unit * currentPrice;
        const newShare = new Share({ accountHolder: account.accountHolder, accountNumber, currentPrice, unit, totalAmount })
        await newShare.save()

        await Balance.findOneAndUpdate(
            { accountNumber },
            { $inc: { share: unit } },
            { new: true }
        )


        return res.status(200).json(newShare)


    } catch (error) {
        return res.status(500).json({ message: "Error occured" });
    }
})

router.get("/record/:number", async (req, res) => {
    try {

        const accountNumber = req.params.number
        const data = await Share.find({ accountNumber })
        if (!data) return res.status(404).json({ message: "No share recod found" })
        else return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message: "Error occured" })
    }
})

module.exports = router;