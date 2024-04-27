const projectRoute = require("express").Router()
const {getAll,getOne,create,update,remove, searchRecords, getAllMissionsByProject} = require("../controller/project.controller")



projectRoute.get("/getAll",getAll)
projectRoute.get("/getOne/:id",getOne)
projectRoute.post("/create",create)
projectRoute.put("/update/:id",update)
projectRoute.delete("/remove/:id",remove)
projectRoute.get("/search/:searchTerm",searchRecords)
projectRoute.get("/getAllMissionsByProject/:id",getAllMissionsByProject)
module.exports = projectRoute