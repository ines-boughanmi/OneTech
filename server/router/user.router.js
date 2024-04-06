const userRoute = require("express").Router()
const {getAll,getOne,create,update,remove,login,register,passCheck} = require("../controller/user.controller")
const authProtection = require("../middleware/auth")



userRoute.get("/getAll",getAll)
userRoute.get("/getOne",authProtection,getOne)
userRoute.post("/register",register)
userRoute.post("/login",login)
userRoute.post("/create",create)
userRoute.put("/update/:id",update)
userRoute.delete("/remove/:id",remove)
userRoute.post("/passCheck",passCheck)
module.exports = userRoute

