const partitionRoute = require("express").Router()
const {getAll,getOne,create,update,remove} = require("../controller/partition.controller")



partitionRoute.get("/getAll",getAll)
partitionRoute.get("/getOne/:id",getOne)
partitionRoute.post("/create",create)
partitionRoute.put("/update/:id",update)
partitionRoute.delete("/remove/:id",remove)
module.exports = partitionRoute