const express = require("express")
const app = express()
const cors = require("cors")

require("./database/connect")
const accountRouter = require("./routes/account")
const loanRouter = require("./routes/loan")
const accountTypeRouter = require("./routes/accountType")
const depositeRouter = require("./routes/deposite")
const shareRouter = require("./routes/share")
const detailRouter = require("./routes/details")

app.use(express.json())
app.use(cors())


app.use("/account", accountRouter)
app.use("/loan", loanRouter);
app.use("/account/type", accountTypeRouter)
app.use("/deposit", depositeRouter)
app.use("/share", shareRouter)
app.use("/details", detailRouter)


app.listen(8000)

