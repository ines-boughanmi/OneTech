const express = require("express")
const app = express()
const PORT = 3001
const multer  = require('multer');
const path = require('path');

const cors = require("cors")
const userRoute = require("./router/user.router")
const carRoute = require("./router/car.router")
const projectRoute = require("./router/project.router")
const missionRoute = require("./router/mission.router")
const partitionRoute = require("./router/partition.router")

require("./database")


app.use(express.static(__dirname+'/..client/dist'))
app.use(cors())
app.use(express.json())


app.use("/api/user", userRoute)
app.use("/api/car", carRoute)
app.use("/api/project", projectRoute)
app.use("/api/mission", missionRoute)
app.use("/api/partition", partitionRoute)









app.listen(PORT,()=>{
    console.log("listening on PORT :",PORT);
})