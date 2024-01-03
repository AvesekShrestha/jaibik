const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/jaibik").then(()=>{
    console.log("Conection successfull")

}).catch((error)=>{
    console.log("Cannot connect to database")
})


