const db = require("../database")
const { Op } = require("sequelize");

module.exports = {
    searchRecords : async (req, res) => {
        try {
          const searchResults = await db.Car.findAll({
            where: {
                [Op.or]: [
                  { car_model: { [Op.like]: `%${req.params.searchTerm}%` } },
                  { brand: { [Op.like]: `%${req.params.searchTerm}%` } },
                  { license_plate: { [Op.like]: `%${req.params.searchTerm}%` } }
                ]
              }
          });
          res.json(searchResults);
        } catch (error) {
          console.error('Error searching records:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      },
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
    },
    filterCars : async (req,res) => {
        try {
            const car = await db.Car.findAll({where : { car_availability : req.body.available}})
            res.json(car)
        } catch (error) {
            console.log(error);
        }
    }
}