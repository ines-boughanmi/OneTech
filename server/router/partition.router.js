const partitionRoute = require("express").Router()
const {getAll,getOne,create,update,remove, getUsersByMission, updateUsersByMission, getPartitionsByUserId} = require("../controller/partition.controller")



partitionRoute.get("/getAll",getAll)
partitionRoute.get("/getOne/:id",getOne)
partitionRoute.post("/create",create)
partitionRoute.put("/update/:id",update)
partitionRoute.delete("/remove/:id",remove)
partitionRoute.get("/getUsersByMission/:id",getUsersByMission)
partitionRoute.post("/updateUsers/:id",updateUsersByMission)
partitionRoute.get("/getPatitionsByUserId/:id",getPartitionsByUserId)
module.exports = partitionRoute