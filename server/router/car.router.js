const carRoute = require("express").Router()
const {getAll,getOne,create,update,remove, searchRecords} = require("../controller/car.controller")



carRoute.get("/getAll",getAll)
carRoute.get("/getOne/:id",getOne)
carRoute.post("/create",create)
carRoute.put("/update/:id",update)
carRoute.delete("/remove/:id",remove)
carRoute.get("/search/:searchTerm",searchRecords)
module.exports = carRoute