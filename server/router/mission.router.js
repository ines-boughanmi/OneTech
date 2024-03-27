const missionRoute = require("express").Router()
const {getAll,getOne,create,update,remove} = require("../controller/mission.controller")



missionRoute.get("/getAll",getAll)
missionRoute.get("/getOne/:id",getOne)
missionRoute.post("/create",create)
missionRoute.put("/update/:id",update)
missionRoute.delete("/remove/:id",remove)
module.exports = missionRoute