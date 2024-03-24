const express = require("express")
const app = express()
const PORT = 3001
const cors = require("cors")
require("./database")


app.use(express.static(__dirname+'/..client/dist'))
app.use(cors())
app.use(express.json())







app.listen(PORT,()=>{
    console.log("listening on Port :",PORT);
})