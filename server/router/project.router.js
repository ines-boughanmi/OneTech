const projectRoute = require("express").Router()
const {getAll,getOne,create,update,remove} = require("../controller/project.controller")



projectRoute.get("/getAll",getAll)
projectRoute.get("/getOne/:id",getOne)
projectRoute.post("/create",create)
projectRoute.put("/update/:id",update)
projectRoute.delete("/remove/:id",remove)
module.exports = projectRoute