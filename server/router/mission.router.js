const missionRoute = require("express").Router()
const {getAll,getOne,create,update,remove,removeByProject, getAllByProjectId, getAllProjectsByMissionId, getAllPartitionsByMission, getAllMissionsByPartiton, getMissionsByUser} = require("../controller/mission.controller")



missionRoute.get("/getAll",getAll)
missionRoute.get("/getOne/:id",getOne)
missionRoute.post("/create",create)
missionRoute.put("/update/:id",update)
missionRoute.delete("/remove/:id",remove)
missionRoute.delete("/removeByProject/:id",removeByProject)
missionRoute.get("/getByProject/:id",getAllByProjectId)
missionRoute.post("/getAllProjectByMission",getAllProjectsByMissionId)
missionRoute.post("/getAllPartitionsByMission",getAllPartitionsByMission)
missionRoute.post("/getAllMissionsByPartiton",getAllMissionsByPartiton)
missionRoute.get("/getMissionsByUser/:id",getMissionsByUser)
module.exports = missionRoute