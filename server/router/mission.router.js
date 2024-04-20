const missionRoute = require("express").Router()
const {getAll,getOne,create,update,remove,removeByProject, getAllByProjectId} = require("../controller/mission.controller")



missionRoute.get("/getAll",getAll)
missionRoute.get("/getOne/:id",getOne)
missionRoute.post("/create",create)
missionRoute.put("/update/:id",update)
missionRoute.delete("/remove/:id",remove)
missionRoute.delete("/removeByProject/:id",removeByProject)
missionRoute.get("/getByProject/:id",getAllByProjectId)
module.exports = missionRoute