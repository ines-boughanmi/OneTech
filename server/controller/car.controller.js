const db = require("../database")
module.exports = {
    getAll:async (req,res)=>{
        try {
            const allCars = await db.Car.findAll({})
            res.json(allCars)
        } catch (error) {
            console.log(error)          
        }
    },
    
    getOne:async (req,res)=>{
        try {
            const oneCar = await db.Car.findOne({where : {id:req.params.id}})
            res.json(oneCar)
        } catch (error) {
            console.log(error)
        }
    },

    create:async (req,res)=>{
        try {
            const car = await db.Car.create(req.body)
            res.json(car)
        } catch (error) {
            console.log(error)
        }
    },


    update:async (req,res)=>{
        try {
            const car = await db.Car.update(req.body,{where:{id:req.params.id}})
            res.json(car)
        } catch (error) {
            console.log(error)
        }
    },

    remove:async (req,res)=>{
        try {
            const car = await db.Car.destroy({where:{id:req.params.id}})
            res.json(car)
        } catch (error) {
            console.log(error)
        }
    }
}